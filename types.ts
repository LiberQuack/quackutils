export type Dictionary<T> = {
    [x: string]: T;
};

export type UnPartial<T> = T extends Partial<infer U> ? U : never

type NativeType = Date | number | string | boolean | undefined

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