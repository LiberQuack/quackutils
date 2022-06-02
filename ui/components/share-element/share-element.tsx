import {CustomElement} from "../../ui-types";
import {component} from "haunted";
import {useEffect} from "haunted/lib/core";
import {html} from "lit";
import {unsafeHTML} from "lit/directives/unsafe-html";
import ShareButtons from "share-buttons";

import fbSvg from "bundle-text:./fb_icon.svg";
import linkedinSvg from "bundle-text:./linkedin_icon.svg";
import twSvg from "bundle-text:./tw_icon.svg";
import wpSvg from "bundle-text:./wp_icon.svg";
import shareSvg from "bundle-text:./share_icon.svg";
import {css} from "../../util/css";

export const ShareElement:CustomElement = function () {

    css`
        share-element a {
            display: inline-block;
        }
        
        share-element svg {
            display: inline-block;
            width: 1em;
            height: 1em;
        }
    `

    useEffect(() => {
        this.classList.add("share-btn");
        ShareButtons.update();

        if (!this.hasAttribute("data-desc")) console.warn(this, "Expected attribute data-desc");
        if (!this.hasAttribute("data-title")) console.warn(this, "Expected attribute data-title");
    }, [])

    return html`
        <a data-url="${document.location.href}" data-id="tw">${unsafeHTML(twSvg)}</a>
        <a data-url="${document.location.href}" data-id="fb">${unsafeHTML(fbSvg)}</a>
        <a data-url="${document.location.href}" data-id="wa">${unsafeHTML(wpSvg)}</a>
    `
}

/**
 * Add in the future
 * <a data-url="${document.location.href}" data-id="in">${unsafeHTML(linkedinSvg)}</a>
 * <a data-url="${document.location.href}" data-id="share">${unsafeHTML(shareSvg)}</a>
 */

customElements.define("share-element", component(ShareElement, {useShadowDOM: false}));