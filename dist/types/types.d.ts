import type { Struct } from "superstruct";
export declare type Dictionary<T> = {
    [x: string]: T;
};
export declare type UnPartial<T> = T extends Partial<infer U> ? U : never;
export declare type Nullable<T> = T | null;
export declare type Undefinable<T> = T | undefined;
/** @deprecated Use ValuesType from "utility-types" instead */
export declare type UnArray<T> = T extends Array<infer U> ? U : never;
export declare type StructType<T extends Struct<any>> = T extends Struct<infer U> ? U : never;
export declare type ConditionalType<Boolean, X, Y> = Boolean extends true ? X : Y;
declare type NativeType = Date | number | string | boolean | undefined | null;
export declare type Pojo = {
    [x: string]: NativeType | NativeType[] | Pojo | Pojo[];
};
declare global {
    interface Navigator {
        getInstalledRelatedApps(): Promise<{
            platform: "webapp";
            url: string;
        }[]>;
    }
}
export interface BeforeInstallPromptEvent extends Event {
    readonly platforms: string[];
    readonly userChoice: Promise<{
        outcome: "accepted" | "dismissed";
        platform: string;
    }>;
    prompt(): Promise<void>;
}
declare global {
    interface WindowEventMap {
        beforeinstallprompt: BeforeInstallPromptEvent;
    }
}
export {};
