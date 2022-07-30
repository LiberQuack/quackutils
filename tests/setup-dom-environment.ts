import {JSDOM, ResourceLoader} from "jsdom";
import json = Mocha.reporters.json;

export function setupDomEnvironment(pageTemplate: string = `<!DOCTYPE html><html><head></head><body></body></html>`) {
    const resourceLoader = new ResourceLoader({
        strictSSL: false,
    });

    const dom = new JSDOM(pageTemplate, {
        runScripts: "dangerously",
        resources: resourceLoader,
    });

    const global = globalThis as any
    global.window = dom.window
    global.document = dom.window.document
    global.Document = dom.window.Document
    global.customElements = window.customElements
    global.HTMLElement = window.HTMLElement

    return {
        clearDomEnvironment: () => {
            delete global.window
            delete global.document
            delete global.Document
            delete global.customElements
            delete global.HTMLElement
        }
    }
}