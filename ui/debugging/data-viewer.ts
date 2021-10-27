import {html, LitElement} from "lit";
import {customElement, property} from "lit/decorators";

const JSONTreeView = require("./json-tree-view/JSONView");

@customElement("data-viewer")
class DataViewer extends LitElement {

    @property()
    public data: any;

    render() {
        let jsonTreeView = new JSONTreeView(this.data);

        //language=HTML
        return html`
            <style>
                :host {
                    display: block;
                }
            
                .jsonView {
                    margin-left: 20px;
                    padding: 2px;
                    cursor: default;
                    color: rgb(156, 156, 156);
                    white-space: nowrap;
                    -webkit-user-select: none;
                }

                .jsonView > div {
                    display: inline-block;
                }

                .jsonView.hidden {
                    display: none;
                }

                .jsonView > .children, .jsonView.insert {
                    display: block;
                }

                .jsonView > .name {
                    color: rgb(172,101,180);
                }

                .jsonView > .separator:before {
                    content: ":";
                }

                .jsonView > .separator {
                    padding-right: 5px;
                }

                .jsonView > .spacing {
                    display: inline-block;
                    width: 15px;
                }

                .jsonView > .spacing::before {
                    content: '1';
                    visibility: hidden;
                }

                .jsonView > .value.null, .jsonView > .value.undefined {
                    color: rgb(128, 128, 128);
                }

                .jsonView > .value.boolean, .jsonView > .value.number {
                    color: rgb(50,133,207);
                }

                .jsonView > .value.string:not(.edit):before, .jsonView > .value.string:not(.edit):after {
                    content: "\\"";
                }

                .jsonView > .value.string {
                    color: rgb(196,54,49);
                }

                .jsonView > .name:hover, .jsonView > .value:hover {
                    background-color: rgba(56, 121, 217, 0.1);
                }

                .jsonView > .expand, .jsonView > .collapse {
                    min-width: 20px;
                    margin-left: -20px;
                    cursor: pointer;
                }

                .jsonView > .expand:before {
                    content: '\\25B6';
                }

                .jsonView > .collapse:before {
                    content: '\\25BC';
                }

                .jsonView > .edit {
                    padding: 0 5px 0 5px;
                    white-space: nowrap;
                    overflow: hidden;
                    background-color: transparent;
                }

                .jsonView > .edit br {
                    display: none;
                }

                .jsonView > .edit * {
                    display: inline;
                    white-space: nowrap;
                }

                .jsonView > .value.edit {
                    color: rgb(200,200,200);
                }

                .jsonView > .delete:before {
                    content: '+';
                    transform: rotate(45deg);
                    -webkit-transform: rotate(45deg);
                    -o-transform: rotate(45deg);
                    -ms-transform: rotate(45deg);
                    display: inline-block;
                }

                .jsonView > .delete {
                    opacity: 0;
                    display: inline;
                    padding: 3px;
                    cursor: pointer;
                    color: rgb(150, 150, 150);
                }

                .jsonView > .item:hover ~ .delete {
                    opacity: 1;
                    color: rgb(150, 150, 150);
                }

                .jsonView > .delete:hover {
                    opacity: 1;
                    color: rgb(0, 0, 0);
                    background: rgb(220, 220, 220);
                }

                .jsonView.readonly > .insert, .jsonView.readonly > .delete {
                    display: none !important;
                }

                .jsonView > .insert:before {
                    content: '+';
                }

                .jsonView > .insert {
                    display: none;
                    color: rgb(150, 150, 150);
                    cursor: pointer;
                }

                .jsonView.expanded > .insert, .jsonView.expanded > .insert {
                    display: inline-block;
                    margin-left: 20px;
                    padding: 3px;
                }

                .jsonView > .insert:hover {
                    color: rgb(0, 0, 0);
                    background: rgb(220, 220, 220);
                }
            </style>
            
            <div @click="${(e: Event) => e.stopPropagation()}">${jsonTreeView.dom}</div>
        `;
    }
}
