import type {Struct} from "superstruct";

export type Dictionary<T> = {
    [x: string]: T;
};

export type UnPartial<T> = T extends Partial<infer U> ? U : never

export type Nullable<T> = T | null;
export type Undefinable<T> = T | undefined;

/** @deprecated Use ValuesType from "utility-types" instead */
export type UnArray<T> = T extends Array<infer U> ? U : never

export type StructType<T extends Struct<any, any>> = T extends Struct<infer U, any> ? U : never;

export type ConditionalType<Boolean, X, Y> = Boolean extends true ? X : Y;

type NativeType = Date | number | string | boolean | undefined | null

export type Pojo = {
    [x: string]: NativeType | NativeType[] | Pojo | Pojo[]
}

//PWA apis
declare global {
    interface Navigator {
        getInstalledRelatedApps(): Promise<{
            platform: "webapp"
            url: string
        }[]>
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