import {html, LitElement} from "lit";
import {repeat} from "lit/directives/repeat";
import {property} from "lit/decorators";
import "./data-viewer";
import {State} from "../../app/state/state";

class AppikConsole extends LitElement {

    walkIndex = -1;

    @property()
    private _inputHistory = [] as any[];

    @property()
    private evaluations = [] as any[];

    private _states: State<any>[] = [];

    @property()
    set states(val: State<any>[]) {
        this._states = val;
    }

    @property()
    set code(code: string) {
        const input = this.getCodeInput();
        input.value = code;
        input.focus();
        this.evaluate(code);
    }

    buildSandBox(vars: any) {
        return function (code:string): any {
            try {
                return eval(`( 
                function () {
                    ${Object.keys(vars).map(varName => `
                        const ${varName} = vars["${varName}"]
                    `).join(";")}
                    
                    return ${code};
                }
            )()`);
            } catch (e) {
                console.error(e);
                return e;
            }
        };
    }


    submitInput(e: KeyboardEvent) {
        if (!(e.code == "Enter" || e.code == "NumpadEnter")) {
            return;
        }

        const input = this.getCodeInput();
        const code = input.value;

        this.evaluate(code);


        if (code != this._inputHistory[this._inputHistory.length - 1]) {
            this._inputHistory = [code, ...this._inputHistory];
        }

        input.value = "";
        this.walkIndex = -1;
    }

    evaluate(code: string) {
        const help = () => {
            return html`
            <code>
                <strong>
                    Welcome to the App console <br>
                    debug your app by using the variables: <br>
                </strong>
                <div>--</div>
                <div>application</div>
                <div>help()</div>
                <div>clear()</div>
            </code>
        `
        };

        const clear = () => {
            this.evaluations = [];
        };

        const stateDictionary = this._states.reduce((acc, s) => ({...acc, [s.id]: s}), {})
        const sandbox = this.buildSandBox({...stateDictionary, help, clear});
        const evalResult = sandbox(code);
        const result = "_$litType$" in evalResult ? evalResult : html`<data-viewer .data="${evalResult}"/>`;

        this.evaluations = [result, ...this.evaluations];
        // this.requestUpdate() //HACKY FIX (it should render automatically... waiting for official lit 3 release)
    }

    render() {
        //language=HTML
        return html`
            <style>
                * {
                    box-sizing: border-box;
                }
            
                :host {
                    display: block;
                    font-size: 14px;
                    font-family: monospace;
                    background: #252525;
                    color: #bbb;
                    flex-direction: column;
                    flex-grow: 0;
                    overflow: auto;     
                }
            </style>
            
            <div style="font-size: 14px; width: 450px; font-family: monospace; color: #bbb; display: flex; flex-direction: column; flex-grow: 0">
                <div style="flex-grow: 1">
                    <input spellcheck="false" @keypress="${this.submitInput}" @keydown="${this.walkHistory}" placeholder="help()" style="width: 100%; padding: 10px 5px; padding-left: 2ch; font-size: inherit; flex-shrink: 0; outline: none; background: inherit; border: none; color: #bbb"/>
                </div>
                <div style="flex-shrink: 1" .hidden="${!this.evaluations.length}">
                    ${repeat(this.evaluations, (it) => it,  it => html`
                        <div style="border-bottom: 1px solid rgba(0,0,0,.15); padding-left: 2ch">
                            ${it}
                        </div>
                    `)}
                </div>
            </div>
        `
    }

    private getCodeInput(): HTMLInputElement {
        return this.renderRoot.querySelector(`input`)!;
    }

    private walkHistory(e: KeyboardEvent) {
        let arrowed = false;

        switch (e.code) {
            case "ArrowUp":
                this.walkIndex += 1;
                arrowed = true;
                break;
            case "ArrowDown":
                this.walkIndex -= 1;
                arrowed = true;
                break;
        }

        if (arrowed) {
            this.walkIndex = Math.max(-1, Math.min(this._inputHistory.length, this.walkIndex));
            const pastValue = this._inputHistory[this.walkIndex];
            const input = this.getCodeInput();
            input.value = pastValue === undefined ? "" : pastValue;
            requestAnimationFrame(() => {
                input.selectionEnd = input.value.length;
                input.selectionStart = input.value.length;
            });
        }
    }

}

customElements.define("appik-console", AppikConsole);

export {AppikConsole}
