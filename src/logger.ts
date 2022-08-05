export const logger = new class Logger {

    error(identifier: string, ...args: any[]) {
        console.error(`${identifier}:`, ...args);
    }

    warn(identifier: string, ...args: any[]) {
        console.warn(`${identifier}:`, ...args);
    }

    info(identifier: string, ...args: any[]) {
        console.info(`${identifier}:`, ...args);
    }

    verbose(identifier: string, ...args: any[]) {
        console.log(`${identifier}:`, ...args);
    }

    debug(identifier: string, ...args: any[]) {
        console.debug(`${identifier}:`, ...args);
    }

}();