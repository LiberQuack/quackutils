import "./index.47ad2c9d.js";
import "./payment.86357596.js";

function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}
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
parcelRequire.register("5f3Dm", function(module, exports) {

$parcel$defineInteropFlag(module.exports);

$parcel$export(module.exports, "default", () => $3d112c1142c92e6b$export$2e2bcd8739ae039);
parcelRequire("5pYYS");

var $d2Ttb = parcelRequire("d2Ttb");

var $3c5SK = parcelRequire("3c5SK");

var $gxyH7 = parcelRequire("gxyH7");
const $3d112c1142c92e6b$var$layoutProps = {};
const $3d112c1142c92e6b$var$MDXLayout = "wrapper";
function $3d112c1142c92e6b$export$2e2bcd8739ae039({ components: components , ...props }) {
    return /*#__PURE__*/ (0, $d2Ttb.mdx)($3d112c1142c92e6b$var$MDXLayout, {
        ...$3d112c1142c92e6b$var$layoutProps,
        ...props,
        components: components,
        mdxType: "MDXLayout"
    }, /*#__PURE__*/ (0, $d2Ttb.mdx)("h1", null, `Payment Client`), /*#__PURE__*/ (0, $d2Ttb.mdx)("p", null, "Use this class to capture payments on your client side, it's simple..."), /*#__PURE__*/ (0, $d2Ttb.mdx)("p", null, "Create a class extending AbstractPaymentClient and implement the required methods"), /*#__PURE__*/ (0, $d2Ttb.mdx)((0, $gxyH7.ReactSrcRender), {
        language: "typescript",
        src: (0, (/*@__PURE__*/$parcel$interopDefault($3c5SK))),
        mdxType: "ReactSrcRender"
    }));
}
$3d112c1142c92e6b$export$2e2bcd8739ae039.isMDXComponent = true;

});
parcelRequire.register("3c5SK", function(module, exports) {
module.exports = "import {AbstractPaymentClient} from \"../src/payment/abstract-payment-client\";\nimport {PaymentProviderCheckout} from \"../src/payment/manager-providers/types\";\nimport {PaymentCheckout, PaymentUserData} from \"../src/payment/types\";\nimport {PaymentStripeClientProvider} from \"../src/payment/client-providers/payment-stripe-provider\";\n\nclass PaymentClient extends AbstractPaymentClient {\n\n    protected async sendCancelCheckout(checkout: PaymentProviderCheckout, reason: string): Promise<PaymentUserData> {\n        const cancellationCheckout: PaymentProviderCheckout = {...checkout};\n        cancellationCheckout.cancelReason = reason;\n\n        const req: RequestInit = {body: JSON.stringify(checkout), method: \"POST\"};\n        const PaymentUserData = await fetch(\"https://fake-api/payments/cancel-checkout\", req).then(it => it.json());\n        return PaymentUserData\n    }\n\n    protected async sendCheckout(checkout: PaymentCheckout | PaymentProviderCheckout): Promise<PaymentUserData> {\n        const reqOpts: RequestInit = {body: JSON.stringify(checkout), method: \"POST\"};\n        const PaymentUserData = await fetch(\"https://fake-api/payments/checkout\", reqOpts).then(it => it.json());\n        return PaymentUserData\n    }\n\n}\n\nconst paymentClient = new PaymentClient([\n    () => new PaymentStripeClientProvider(\"pk_test_51IG332FIx1iLyZGc71gYaVCUDKMPAFlRn49tyrzTqf3FYymriwKSJAnKbWyAK9c9WdIi3gn6O9Y8rOKc1tpSJGmQ00RU6pFiTC\")\n]);";

});



//# sourceMappingURL=payment.1e7b3bd4.js.map
