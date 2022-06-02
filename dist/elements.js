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
var $parcel$modules = {};
var $parcel$inits = {};

var parcelRequire = $parcel$global["parcelRequireb699"];
if (parcelRequire == null) {
  parcelRequire = function(id) {
    if (id in $parcel$modules) {
      return $parcel$modules[id].exports;
    }
    if (id in $parcel$inits) {
      var init = $parcel$inits[id];
      delete $parcel$inits[id];
      var module = {id: id, exports: {}};
      $parcel$modules[id] = module;
      init.call(module.exports, module, module.exports);
      return module.exports;
    }
    var err = new Error("Cannot find module '" + id + "'");
    err.code = 'MODULE_NOT_FOUND';
    throw err;
  };

  parcelRequire.register = function register(id, init) {
    $parcel$inits[id] = init;
  };

  $parcel$global["parcelRequireb699"] = parcelRequire;
}
parcelRequire.register("kKFo9", function(module, exports) {
module.exports = Promise.resolve(require("./timer-element.d3a93e82.js")).then(()=>parcelRequire("24Rxt"));

});

parcelRequire.register("hX9Uv", function(module, exports) {
module.exports = Promise.resolve(require("./share-element.e4a0893a.js")).then(()=>parcelRequire("l9sLc"));

});

console.log("Lazy loading components");

if (document.querySelector("timer-element")) (parcelRequire("kKFo9"));

if (document.querySelector("share-element")) (parcelRequire("hX9Uv"));


//# sourceMappingURL=elements.js.map
