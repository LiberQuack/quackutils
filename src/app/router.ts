/// <reference lib="dom.iterable"/>

import {State} from "./state/state";
import {dictionaryMap} from "../_/dictionary";

export type RouteStateType = {
    path: string;
    fullPath: string;
    pathTemplate: string;
    params: { [x: string]: string };
    queryObj: { [x: string]: string };
    navigationHistory: string[];

    /**
     * Start with ? (eg: ?foo=bar&food=good)
     */
    queryStr: string;
};

const paramValueRegex = /(.+?)(?=\/|$|#|\?)/g;
const paramRegex = new RegExp(`:${paramValueRegex.source}`, "g");

export const addLinkClickListener = (cb: (event: Event, elm: HTMLAnchorElement, info: { isOutbound: boolean, locationReplace: boolean, opensNewTab: boolean }) => void) => {
    window.addEventListener("click", function (e: Event) {
        let elm = e.target as HTMLAnchorElement | HTMLElement;

        do {
            if ("href" in elm && elm.href) {
                const isInbound = elm.protocol === location.protocol && elm.origin === location.origin
                const locationReplace = elm.hasAttribute("replace");
                const opensNewTab = elm.target === "_blank";
                cb(e, elm, {isOutbound: !isInbound, locationReplace, opensNewTab})
                break;
            }

            elm = elm.parentElement!;
        } while (elm && elm.parentElement)
    })
}

//TODO: Improve and make it more simple
export const initRouter = (pathTemplates: string[]) => {

    function getQueryObj(search: string) {
        const obj = Object.fromEntries(new URLSearchParams(search));
        const decodedObj = dictionaryMap(obj, (key, value, index) => [decodeURIComponent(key), decodeURIComponent(value)])
        return decodedObj
    }

    function _buildNextState(history: RouteStateType["navigationHistory"], path: string, search: string, hash: string, state = {} as RouteStateType): RouteStateType {
        state.path = path;
        state.fullPath =  path + search + hash;
        state.pathTemplate = getMatchingRoute(path) ?? "";
        state.params = getParams(state.pathTemplate, state.path);
        state.queryObj = getQueryObj(search);
        state.queryStr = search;
        state.navigationHistory = history
        return state;
    }

    const {pathname, search, hash} = location
    const routeState = new State<RouteStateType>("router", _buildNextState([pathname + search + hash], pathname, search, hash));

    function _update(history: RouteStateType["navigationHistory"]) {
        routeState.update(draftState => {
            _buildNextState(history || draftState.navigationHistory, location.pathname, location.search, location.hash, draftState);
        })
    }

    function getMatchingRoute(currentRoute: string) {
        return pathTemplates.find(route => matchRoute(route, currentRoute));
    }

    function queryObjToString(queryObj: RouteStateType["queryObj"]): string {
        const keys = Object.keys(queryObj);
        return keys.length > 0 ? "?" + keys.map(key => `${encodeURIComponent(key)}=${encodeURIComponent(queryObj[key]!)}`).join("&") : "";
    }

    function normalizePath(to: string) {
        const currentPath = location.pathname;

        if (to[0] === "?") {
            to = `${currentPath}${to}`;
        }

        if (to[0] !== "/") {
            to = `${currentPath.replace(/(.*)(?:\/.+?$)/, `$1/${to}`)}`
        }

        return to;
    }

    function historyGoBack(stepsBack: number) {
        if (stepsBack < 0) {
            //History.go will trigger popstate listener, and then, _update will be called there
            history.go(stepsBack);
        }
    }

    function navigate(to: string): void {
        const nextUrl = normalizePath(to);
        const {navigationHistory} = routeState.getState();

        if (nextUrl !== navigationHistory[navigationHistory.length - 1]) {
            let historyEntryIndex = navigationHistory.indexOf(nextUrl);
            if (historyEntryIndex > -1) {
                const stepsBack = (navigationHistory.length - 1 - historyEntryIndex) * -1;
                historyGoBack(stepsBack);
            } else {
                history.pushState(null, "", nextUrl);
                _update([...navigationHistory, nextUrl]);
            }
        } else {
            _update([...navigationHistory]);
        }
    }

    function replace(to: string): void {
        const nextUrl = normalizePath(to)
        const currentRouteState = routeState.getState();
        const navigationHistory = [...currentRouteState.navigationHistory];
        const historyEntryIndex = navigationHistory.indexOf(nextUrl);

        if (historyEntryIndex > -1) {
            const stepsBack = (navigationHistory.length - 1 - historyEntryIndex) * -1;
            historyGoBack(stepsBack)
        } else {
            history.replaceState(null, "", nextUrl);
            const nextNavHistory = [...navigationHistory.slice(0, navigationHistory.length - 1), nextUrl]
            _update(nextNavHistory);
        }
    }

    //According to mdn, is triggered on history.back, history.go(-N), history.go(N), or user clicking on back or forward button
    window.addEventListener("popstate", e => {
        const fullPath = location.pathname + location.search + location.hash;
        const navHistory = routeState.getState().navigationHistory;
        const historyEntryIndex = navHistory.indexOf(fullPath);

        let nextNavHistory: string[];
        if (historyEntryIndex > -1) {
            nextNavHistory = navHistory.slice(0, historyEntryIndex + 1);
        } else {
            //Navigation history get messy when history.go(2 or more) is called
            //Or if user long press forward button and causes forward (2 or more)
            //For now it works fine for most cases (user simply clicking on forward)
            nextNavHistory = [...navHistory, fullPath]
        }

        _update(nextNavHistory);
    });

    addLinkClickListener((event, elm, {isOutbound, locationReplace, opensNewTab}) => {
        if (!isOutbound && !opensNewTab) {
            if (locationReplace) {
                replace(elm.pathname + elm.search + elm.hash);
            } else {
                navigate(elm.pathname + elm.search + elm.hash);
            }
            event.preventDefault();
        }
    })

    return {routeState, navigate, replace, queryObjToString}
};

export function matchRoute(templatePath: string, inputPath: string) {
    const routeRegexStr = templatePath.replace(paramRegex, paramValueRegex.source);
    const regex = new RegExp(`^${routeRegexStr}$`);
    return regex.test(inputPath)
}

function getParams(templatePath: string, inputPath: string): RouteStateType["params"] {
    const paramValuesRegexStr = templatePath.replace(paramRegex, paramValueRegex.source);
    const paramValuesRegex = new RegExp(paramValuesRegexStr);
    const [ , ...values] = (inputPath.match(paramValuesRegex) || []).map(decodeURIComponent);

    const paramsRegexStr = templatePath.replace(paramRegex, paramRegex.source);
    const paramsRegex = new RegExp(paramsRegexStr)
    const [ , ...params] = templatePath.match(paramsRegex) || [];

    return params.reduce((acc, param, index) => ({...acc, [param]: values[index]}), {});
}

export function generateHref(route: string, params: { [x: string]: string }): string {
    const paramNames = Object.keys(params);
    for (let paramName of paramNames) {
        route = route.replace(`:${paramName}`, params[paramName]!)
    }
    return route;
}

