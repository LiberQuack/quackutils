("undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{}).parcelRequire9622.register("e8NUo",(function(e,n){var r,t,i,o;r=e.exports,t="loadStripe",i=()=>w,Object.defineProperty(r,t,{get:i,set:o,enumerable:!0,configurable:!0});var a="https://js.stripe.com/v3",l=/^https:\/\/js\.stripe\.com\/v3\/?(\?.*)?$/,s="loadStripe.setLoadParameters was called but an existing Stripe.js script already exists in the document; existing script parameters will be used",d=null,u=function(e){return null!==d||(d=new Promise((function(n,r){if("undefined"!=typeof window)if(window.Stripe&&e&&console.warn(s),window.Stripe)n(window.Stripe);else try{var t=function(){for(var e=document.querySelectorAll('script[src^="'.concat(a,'"]')),n=0;n<e.length;n++){var r=e[n];if(l.test(r.src))return r}return null}();t&&e?console.warn(s):t||(t=function(e){var n=e&&!e.advancedFraudSignals?"?advancedFraudSignals=false":"",r=document.createElement("script");r.src="".concat(a).concat(n);var t=document.head||document.body;if(!t)throw new Error("Expected document.body not to be null. Stripe.js requires a <body> element.");return t.appendChild(r),r}(e)),t.addEventListener("load",(function(){window.Stripe?n(window.Stripe):r(new Error("Stripe.js not available"))})),t.addEventListener("error",(function(){r(new Error("Failed to load Stripe.js"))}))}catch(e){return void r(e)}else n(null)}))),d},c=function(e,n,r){if(null===e)return null;var t=e.apply(void 0,n);return function(e,n){e&&e._registerWrapper&&e._registerWrapper({name:"stripe-js",version:"1.32.0",startTime:n})}(t,r),t},p=Promise.resolve().then((function(){return u(null)})),f=!1;p.catch((function(e){f||console.warn(e)}));var w=function(){for(var e=arguments.length,n=new Array(e),r=0;r<e;r++)n[r]=arguments[r];f=!0;var t=Date.now();return p.then((function(e){return c(e,n,t)}))}}));
//# sourceMappingURL=stripe.esm.a76a3ab4.js.map