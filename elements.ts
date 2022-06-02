console.log("Lazy loading components");

if (document.querySelector("timer-element")) import("./ui/components/timer-element/timer-element");
if (document.querySelector("share-element")) import("./ui/components/share-element/share-element");