import {State} from "./state";

type RouteStateType = {
    path: string;
    pathTemplate: string;
    params: { [x: string]: string };
};

const paramValueRegex = /(.+?)(?=\/|$|#|\?)/g;
const paramRegex = new RegExp(`:${paramValueRegex.source}`, "g");

export const initRouter = (pathTemplates: string[]) => {

    function _buildNextState(path: string, search: string, hash: string, state: any = {}): RouteStateType {
        state.path = path;
        state.pathTemplate = getMatchingRoute(path) ?? "";
        state.params = getParams(state.pathTemplate, state.path);
        return state;
    }

    const routeState = new State<RouteStateType>(
        _buildNextState(location.pathname, location.search, location.hash)
    );

    function _update() {
        routeState.update(draftState => {
            _buildNextState(location.pathname, location.search, location.hash, draftState)
        })
    }

    function getMatchingRoute(currentRoute: string) {
        return pathTemplates.find(route => matchRoute(route, currentRoute));
    }

    function navigate(to: string): void {
        history.pushState(null, "", to);
        _update();
    }

    function replace(to: string): void {
        history.replaceState(null, "", to);
        _update();
    }

    window.addEventListener("popstate", _update)
    window.addEventListener("click", function (e: Event) {
        let elm = e.target as HTMLAnchorElement | HTMLElement;

        do {
            //@ts-ignore
            if (elm.localName.toLowerCase() === "a" && (elm.protocol === location.protocol && elm.origin === location.origin && !elm.target)) {
                //@ts-ignore
                navigate(elm.pathname + location.search)
                e.preventDefault();
            }
            if (elm.localName.toLowerCase() === "a") {
                break;
            }
            elm = elm.parentElement!;
        } while (elm && elm.parentElement)
    });

    return {routeState, navigate, replace}
};

export function matchRoute(templatePath: string, inputPath: string) {
    const routeRegexStr = templatePath.replace(paramRegex, paramValueRegex.source);
    const regex = new RegExp(routeRegexStr);
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
        route = route.replace(`:${paramName}`, params[paramName])
    }
    return route;
}

