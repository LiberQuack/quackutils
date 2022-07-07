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
parcelRequire.register("lTByv", function(module, exports) {
module.exports = Promise.resolve(require("./timer-element.f9a8eaa1.js")).then(()=>parcelRequire("6bCY3"));

});

parcelRequire.register("5NjaG", function(module, exports) {
module.exports = Promise.resolve(require("./share-element.792fc7e9.js")).then(()=>parcelRequire("5KyK1"));

});

parcelRequire.register("cSkqO", function(module, exports) {
module.exports = Promise.resolve(require("./increment-number.bbc4efb7.js")).then(()=>parcelRequire("luXp6"));

});

console.log("Lazy loading components");

if (document.querySelector("timer-element")) (parcelRequire("lTByv"));

if (document.querySelector("share-element")) (parcelRequire("5NjaG"));

if (document.querySelector("increment-number")) (parcelRequire("cSkqO"));


//# sourceMappingURL=elements.js.map
