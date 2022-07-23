import {JSDOM, ResourceLoader} from "jsdom";

test();

async function test() {
    const resourceLoader = new ResourceLoader({
        strictSSL: false,
    });

    const dom = new JSDOM(`<!DOCTYPE html><html><head></head><body>Potato</body></html>`, {
        runScripts: "dangerously",
        resources: resourceLoader,
    });

// @ts-ignore
    globalThis.window = dom.window
    globalThis.document = dom.window.document
    globalThis.Document = dom.window.Document
    globalThis.customElements = window.customElements
    globalThis.HTMLElement = window.HTMLElement

    const {html, render} = await import("lit");
    await import("../src/ui/components/timer-element/timer-element.js");

    const template = html`<timer-element target-date="2030-01-01">POTATO</timer-element>`
    render(template, document.body);

    console.log(document.body.textContent);
}