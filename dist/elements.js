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

var parcelRequire = $parcel$global["parcelRequire9622"];
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

  $parcel$global["parcelRequire9622"] = parcelRequire;
}
parcelRequire.register("giUei", function(module, exports) {
module.exports = import("./timer-element.5f1bcfc5.js").then(()=>parcelRequire("bOlJ4"));

});

parcelRequire.register("5ssQK", function(module, exports) {
module.exports = import("./share-element.9c3b013b.js").then(()=>parcelRequire("gnzVA"));

});

parcelRequire.register("dGg3n", function(module, exports) {
module.exports = import("./increment-number.02b013c3.js").then(()=>parcelRequire("9PUIi"));

});

console.log("Lazy loading components");

if (document.querySelector("timer-element")) (parcelRequire("giUei"));

if (document.querySelector("share-element")) (parcelRequire("5ssQK"));

if (document.querySelector("increment-number")) (parcelRequire("dGg3n"));


//# sourceMappingURL=elements.js.map
