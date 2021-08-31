export const switcher = (...options: {case: boolean | undefined, then: any}[]) => {
    return options.find(it => it.case)?.then;
}