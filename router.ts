import {State} from "./state";

type RouteStateType = {
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

export const initRouter = (pathTemplates: string[]) => {

    function getQueryObj(search: string) {
        return Object.fromEntries(new URLSearchParams(search));
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

    const routeState = new State<RouteStateType>("router", {} as any);

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
        return keys.length > 0 ? "?" + keys.map(key => `${encodeURIComponent(key)}=${encodeURIComponent(queryObj[key]!)}`) : "";
    }

    function navigate(to: string): void {
        const {navigationHistory} = routeState.getState();
        if (to !== navigationHistory[navigationHistory.length - 1]) {
            history.pushState(null, "", to);
            _update([...navigationHistory, to]);
        } else {
            _update([...navigationHistory]);
        }
    }

    function replace(to: string): void {
        const navigationHistory = [...routeState.getState().navigationHistory];

        if (to === navigationHistory[navigationHistory.length - 2]) {
            history.back();
        } else {
            history.replaceState(null, "", to);
            const nextNavHistory = [...navigationHistory.slice(0, navigationHistory.length - 1), to]
            _update(nextNavHistory);
        }
    }

    const {pathname, search, hash} = location
    _update([pathname + search + hash]);

    window.addEventListener("popstate", e => {
        const navHistory = routeState.getState().navigationHistory;
        _update(navHistory.slice(0, navHistory.length - 1))
    });

    window.addEventListener("click", function (e: Event) {
        let elm = e.target as HTMLAnchorElement | HTMLElement;

        do {
            //@ts-ignore
            if (elm.localName.toLowerCase() === "a" && (elm.protocol === location.protocol && elm.origin === location.origin && !elm.target)) {
                //@ts-ignore
                navigate(elm.pathname + elm.search + elm.hash)
                e.preventDefault();
            }
            if (elm.localName.toLowerCase() === "a") {
                break;
            }
            elm = elm.parentElement!;
        } while (elm && elm.parentElement)
    });

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
    const [ , ...values] = inputPath.match(paramValuesRegex) || [];

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

