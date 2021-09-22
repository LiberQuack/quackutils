export const switcher = (...options: {case: any, then: any}[]) => {
    return options.find(it => it.case)?.then;
}