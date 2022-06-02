import {component as $3I17V$component} from "haunted";
import {useEffect as $3I17V$useEffect} from "haunted/lib/core";
import {html as $3I17V$html} from "lit";
import {unsafeHTML as $3I17V$unsafeHTML} from "lit/directives/unsafe-html";
import $3I17V$sharebuttons from "share-buttons";

function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}
function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}
var $parcel$global =
typeof globalThis !== 'undefined'
  ? globalThis
  : typeof self !== 'undefined'
  ? self
  : typeof window !== 'undefined'
  ? window
  : typeof global !== 'undefined'
  ? global
  : {};
var parcelRequire = $parcel$global["parcelRequireb699"];
parcelRequire.register("xTgeg", function(module, exports) {

$parcel$export(module.exports, "ShareElement", () => $861535c0d7219b92$export$daefdd33db3ae1c7);






var $gbAs9 = parcelRequire("gbAs9");

var $4f0ZH = parcelRequire("4f0ZH");

var $lHXsG = parcelRequire("lHXsG");

var $5Axjm = parcelRequire("5Axjm");
const $861535c0d7219b92$export$daefdd33db3ae1c7 = function() {
    (0, $5Axjm.css)`
        share-element a {
            display: inline-block;
        }
        
        share-element svg {
            display: inline-block;
            width: 1em;
            height: 1em;
        }
    `;
    (0, $3I17V$useEffect)(()=>{
        this.classList.add("share-btn");
        (0, $3I17V$sharebuttons).update();
        if (!this.hasAttribute("data-desc")) console.warn(this, "Expected attribute data-desc");
        if (!this.hasAttribute("data-title")) console.warn(this, "Expected attribute data-title");
    }, []);
    return (0, $3I17V$html)`
        <a data-url="${document.location.href}" data-id="tw">${(0, $3I17V$unsafeHTML)((0, (/*@__PURE__*/$parcel$interopDefault($4f0ZH))))}</a>
        <a data-url="${document.location.href}" data-id="fb">${(0, $3I17V$unsafeHTML)((0, (/*@__PURE__*/$parcel$interopDefault($gbAs9))))}</a>
        <a data-url="${document.location.href}" data-id="wa">${(0, $3I17V$unsafeHTML)((0, (/*@__PURE__*/$parcel$interopDefault($lHXsG))))}</a>
    `;
};
/**
 * Add in the future
 * <a data-url="${document.location.href}" data-id="in">${unsafeHTML(linkedinSvg)}</a>
 * <a data-url="${document.location.href}" data-id="share">${unsafeHTML(shareSvg)}</a>
 */ customElements.define("share-element", (0, $3I17V$component)($861535c0d7219b92$export$daefdd33db3ae1c7, {
    useShadowDOM: false
}));

});
parcelRequire.register("gbAs9", function(module, exports) {
module.exports = "<svg enable-background=\"new 0 0 48 48\" id=\"Layer_1\" version=\"1.1\" viewBox=\"0 0 48 48\" xml:space=\"preserve\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n    <circle cx=\"24\" cy=\"24\" fill=\"#4E71A8\" r=\"24\"></circle>\n    <path d=\"M29.9,19.5h-4v-2.6c0-1,0.7-1.2,1.1-1.2c0.5,0,2.8,0,2.8,0v-4.4l-3.9,0c-4.4,0-5.3,3.3-5.3,5.3v2.9h-2.5V24  h2.5c0,5.8,0,12.7,0,12.7h5.3c0,0,0-7,0-12.7h3.6L29.9,19.5z\" fill=\"#FFFFFF\"></path>\n</svg>";

});

parcelRequire.register("4f0ZH", function(module, exports) {
module.exports = "<svg enable-background=\"new 0 0 48 48\" id=\"Layer_1\" version=\"1.1\" viewBox=\"0 0 48 48\" xml:space=\"preserve\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"><circle cx=\"24\" cy=\"24\" fill=\"#1CB7EB\" r=\"24\"></circle>\n    <g><g><path d=\"M36.8,15.4c-0.9,0.5-2,0.8-3,0.9c1.1-0.7,1.9-1.8,2.3-3.1c-1,0.6-2.1,1.1-3.4,1.4c-1-1.1-2.3-1.8-3.8-1.8    c-2.9,0-5.3,2.5-5.3,5.7c0,0.4,0,0.9,0.1,1.3c-4.4-0.2-8.3-2.5-10.9-5.9c-0.5,0.8-0.7,1.8-0.7,2.9c0,2,0.9,3.7,2.3,4.7    c-0.9,0-1.7-0.3-2.4-0.7c0,0,0,0.1,0,0.1c0,2.7,1.8,5,4.2,5.6c-0.4,0.1-0.9,0.2-1.4,0.2c-0.3,0-0.7,0-1-0.1    c0.7,2.3,2.6,3.9,4.9,3.9c-1.8,1.5-4.1,2.4-6.5,2.4c-0.4,0-0.8,0-1.3-0.1c2.3,1.6,5.1,2.6,8.1,2.6c9.7,0,15-8.6,15-16.1    c0-0.2,0-0.5,0-0.7C35.2,17.6,36.1,16.6,36.8,15.4z\" fill=\"#FFFFFF\"></path></g></g></svg>";

});

parcelRequire.register("lHXsG", function(module, exports) {
module.exports = "<svg version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" viewBox=\"0 0 418 418\" xml:space=\"preserve\">\r\n<g>\r\n    <circle cx=\"209\" cy=\"209\" r=\"205\" fill=\"#fff\"></circle>\r\n\t<path fill=\"#7AD06D\" d=\"M198.929,0.242C88.5,5.5,1.356,97.466,1.691,208.02c0.102,33.672,8.231,65.454,22.571,93.536\r\n\t\tL2.245,408.429c-1.191,5.781,4.023,10.843,9.766,9.483l104.723-24.811c26.905,13.402,57.125,21.143,89.108,21.631\r\n\t\tc112.869,1.724,206.982-87.897,210.5-200.724C420.113,93.065,320.295-5.538,198.929,0.242z M323.886,322.197\r\n\t\tc-30.669,30.669-71.446,47.559-114.818,47.559c-25.396,0-49.71-5.698-72.269-16.935l-14.584-7.265l-64.206,15.212l13.515-65.607\r\n\t\tl-7.185-14.07c-11.711-22.935-17.649-47.736-17.649-73.713c0-43.373,16.89-84.149,47.559-114.819\r\n\t\tc30.395-30.395,71.837-47.56,114.822-47.56C252.443,45,293.218,61.89,323.887,92.558c30.669,30.669,47.559,71.445,47.56,114.817\r\n\t\tC371.446,250.361,354.281,291.803,323.886,322.197z\"></path>\r\n    <path fill=\"#7AD06D\" d=\"M309.712,252.351l-40.169-11.534c-5.281-1.516-10.968-0.018-14.816,3.903l-9.823,10.008\r\n\t\tc-4.142,4.22-10.427,5.576-15.909,3.358c-19.002-7.69-58.974-43.23-69.182-61.007c-2.945-5.128-2.458-11.539,1.158-16.218\r\n\t\tl8.576-11.095c3.36-4.347,4.069-10.185,1.847-15.21l-16.9-38.223c-4.048-9.155-15.747-11.82-23.39-5.356\r\n\t\tc-11.211,9.482-24.513,23.891-26.13,39.854c-2.851,28.144,9.219,63.622,54.862,106.222c52.73,49.215,94.956,55.717,122.449,49.057\r\n\t\tc15.594-3.777,28.056-18.919,35.921-31.317C323.568,266.34,319.334,255.114,309.712,252.351z\"></path>\r\n</g>\r\n</svg>\r\n";

});

parcelRequire.register("5Axjm", function(module, exports) {

$parcel$export(module.exports, "css", () => $863605da0c21dad4$export$dbf350e5966cf602);
let $863605da0c21dad4$var$memory = [];
const $863605da0c21dad4$export$dbf350e5966cf602 = (template, ...values)=>{
    let text = "";
    if (Array.isArray(template)) for(let i = 0; i < template.length; i++){
        text += template[i];
        text += values[i];
    }
    else text = template;
    if ($863605da0c21dad4$var$memory.indexOf(text) > -1) return;
    let styleElement = document.createElement("style");
    styleElement.innerHTML = text;
    document.head.appendChild(styleElement);
    $863605da0c21dad4$var$memory.push(text);
};

});



//# sourceMappingURL=share-element.28d78863.js.map
