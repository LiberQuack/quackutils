console.log("Lazy loading components");

if (document.querySelector("timer-element")) import("./src/ui/components/timer-element/timer-element");
if (document.querySelector("share-element")) import("./src/ui/components/share-element/share-element");
if (document.querySelector("increment-number")) import("./src/ui/components/increment-number/increment-number");