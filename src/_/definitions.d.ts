declare module "\*.svg" {
    const content: string;
    export default content;
}

declare module "urlb64touint8array" {
    const fun: (arg:string) => any
    export default fun
}

declare module "share-buttons" {
    const ShareButtons: { update: () => void; };
    export default ShareButtons;
}