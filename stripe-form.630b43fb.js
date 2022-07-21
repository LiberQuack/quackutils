import "./index.47ad2c9d.js";
import "./increment-number.a0fbecdc.js";
import "./payment.86357596.js";

function $parcel$defineInteropFlag(a) {
  Object.defineProperty(a, '__esModule', {value: true, configurable: true});
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
var parcelRequire = $parcel$global["parcelRequire9622"];
parcelRequire.register("iuKmy", function(module, exports) {

$parcel$defineInteropFlag(module.exports);

$parcel$export(module.exports, "default", () => $d76efe07e045eeae$export$2e2bcd8739ae039);
parcelRequire("5pYYS");

var $d2Ttb = parcelRequire("d2Ttb");

var $gxyH7 = parcelRequire("gxyH7");

var $k6j4s = parcelRequire("k6j4s");
parcelRequire("8QIvq");
const $d76efe07e045eeae$var$usage1 = (0, $k6j4s.html)`
    <stripe-form stripe-public-key="pk_test_51IG332FIx1iLyZGc71gYaVCUDKMPAFlRn49tyrzTqf3FYymriwKSJAnKbWyAK9c9WdIi3gn6O9Y8rOKc1tpSJGmQ00RU6pFiTC">
        <stripe-card-number></stripe-card-number>
        <stripe-card-expiry></stripe-card-expiry>
        <stripe-card-cvc></stripe-card-cvc>
        <stripe-submit-error></stripe-submit-error>
        <stripe-submit><button>Submit</button></stripe-submit>
    </stripe-form>
`;
const $d76efe07e045eeae$var$usage2 = (0, $k6j4s.html)`
    <stripe-form stripe-public-key="pk_test_51IG332FIx1iLyZGc71gYaVCUDKMPAFlRn49tyrzTqf3FYymriwKSJAnKbWyAK9c9WdIi3gn6O9Y8rOKc1tpSJGmQ00RU6pFiTC">
        <stripe-card></stripe-card>
        <stripe-submit-error></stripe-submit-error>
        <stripe-submit><button>Submit</button></stripe-submit>
    </stripe-form>
`;
const $d76efe07e045eeae$var$layoutProps = {};
const $d76efe07e045eeae$var$MDXLayout = "wrapper";
function $d76efe07e045eeae$export$2e2bcd8739ae039({ components: components , ...props }) {
    return /*#__PURE__*/ (0, $d2Ttb.mdx)($d76efe07e045eeae$var$MDXLayout, {
        ...$d76efe07e045eeae$var$layoutProps,
        ...props,
        components: components,
        mdxType: "MDXLayout"
    }, /*#__PURE__*/ (0, $d2Ttb.mdx)("div", null, "Example 1"), /*#__PURE__*/ (0, $d2Ttb.mdx)((0, $gxyH7.ReactHtmlRender), {
        html: $d76efe07e045eeae$var$usage1,
        mdxType: "ReactHtmlRender"
    }), /*#__PURE__*/ (0, $d2Ttb.mdx)("div", null, "Example 2"), /*#__PURE__*/ (0, $d2Ttb.mdx)((0, $gxyH7.ReactHtmlRender), {
        html: $d76efe07e045eeae$var$usage2,
        mdxType: "ReactHtmlRender"
    }), /*#__PURE__*/ (0, $d2Ttb.mdx)("hr", null), /*#__PURE__*/ (0, $d2Ttb.mdx)("div", null, "Proceed to PaymentClient and PaymentClient providers documentations to understand how to send stripe data to your api"));
}
$d76efe07e045eeae$export$2e2bcd8739ae039.isMDXComponent = true;

});


//# sourceMappingURL=stripe-form.630b43fb.js.map
