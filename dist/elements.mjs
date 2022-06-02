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
parcelRequire.register("ajCyw", function(module, exports) {
module.exports = import("./timer-element.d36fad28.js").then(()=>parcelRequire("3MBbb"));

});

parcelRequire.register("3Rg4N", function(module, exports) {
module.exports = import("./share-element.28d78863.js").then(()=>parcelRequire("xTgeg"));

});

console.log("Lazy loading components");

if (document.querySelector("timer-element")) (parcelRequire("ajCyw"));

if (document.querySelector("share-element")) (parcelRequire("3Rg4N"));


//# sourceMappingURL=elements.mjs.map
