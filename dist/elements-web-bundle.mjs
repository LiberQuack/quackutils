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
parcelRequire.register("ltVO5", function(module, exports) {
module.exports = import("./timer-element.0c7bc8d8.js").then(()=>parcelRequire("5hmFI"));

});

parcelRequire.register("iDFpD", function(module, exports) {
module.exports = import("./share-element.6f27ce13.js").then(()=>parcelRequire("HWFlE"));

});

parcelRequire.register("8puEM", function(module, exports) {
module.exports = import("./increment-number.50bd202e.js").then(()=>parcelRequire("crQfv"));

});

console.log("Lazy loading components");

if (document.querySelector("timer-element")) (parcelRequire("ltVO5"));

if (document.querySelector("share-element")) (parcelRequire("iDFpD"));

if (document.querySelector("increment-number")) (parcelRequire("8puEM"));


//# sourceMappingURL=elements-web-bundle.mjs.map
