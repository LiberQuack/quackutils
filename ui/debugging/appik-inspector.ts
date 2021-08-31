import {html, LitElement} from "lit";
import {property} from "lit/decorators";
import "./appik-console";
import "./data-viewer";

import {AppikConsole} from "./appik-console";
import {State} from "../../state";

class AppikInspector extends LitElement {

    private _states: State<any>[] = [];

    @property()
    set states(states: State<any>[]) {
        states.forEach(it => {
            it.subscribe(() => this.requestUpdate())
        })
        this._states = states;
    }

    render() {
        //language=HTML
        return html`

            <style>
                * {
                    box-sizing: border-box;
                }
                
                :host {
                    font-family: Roboto, arial, sans-serif;
                    color: #444;
                    display: block;
                    background: #4d4d4d;
                    box-shadow: 0 5px 25px -5px rgba(0,0,0,.5);
                    z-index: 15000;
                    height: 100%;
                }
                
                button {
                    cursor: pointer;
                    padding: 10px;
                    border: none;
                    background: #fff;
                    border-radius: 2px;
                    box-shadow: 0 2px 2px rgba(0,0,0,.45);
                    outline: none;
                    transition: .2s
                }
                
                button:focus, button:hover {
                    background: #fff;
                }
            </style>
            
            <div style="display: flex; height: 100%">
                
                <div style="flex-grow: 1; flex-shrink: 0;color: #bbb">
                    <div style="padding: 10px">
                        <strong>
                            Resources:
                        </strong> 
                        <div>
                            ${this._states.map(it => html`
                                <button @click="${() => this.inputResourceCode(it.id)}">${it.id}</button>
                            `)}
                        </div>
                    </div>
                </div>
                
                <appik-console .states="${this._states}"/>
            </div>
        `;
    }

    inputResourceCode(resourceName: string) {
        this.getConsole().code = `${resourceName}.getState()`;
    }

    getConsole(): AppikConsole {
        return this.renderRoot.querySelector(`appik-console`)!;
    }
}

const openAppikInspector = (() => {

    console.log("Starting state inspector");
    let popup: Window | null;

    return function (states: State<any>[]): void {
        if (window.opener) {
            return console.log("Preventing state inspector execution");
        }

        if (!customElements.get("appik-inspector")) {
            customElements.define("appik-inspector", AppikInspector);
        }

        const inspectorElm = document.createElement("appik-inspector") as AppikInspector;
        inspectorElm.states = states;

        popup = window.open(undefined, 'inspector', 'height=500,width=1080,left=750,top=50,resizable=yes,scrollbars=yes,toolbar=yes,menubar=yes,location=no,directories=no,status=no');
        if (!popup) throw "Opening new window was not possible";

        popup.document.head.innerHTML = "";
        popup.document.body.innerHTML = "";
        popup.document.body.style.margin = "0";
        popup.document.documentElement.style.height = "100%";
        popup.document.body.style.height = "100%";
        popup.document.title = "Application Inspector";
        popup.document.body.appendChild(inspectorElm);
    }
})();

export {openAppikInspector, AppikInspector}
