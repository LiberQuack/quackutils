let memory: string[] = [];

export const css = (template: TemplateStringsArray | string, ...values: (string | number)[]) => {

    let text = "";

    if (Array.isArray(template)) {
        for (let i = 0; i < template.length; i++) {
            text += template[i];
            text += values[i];
        }
    } else {
        text = template as string
    }

    if (memory.indexOf(text) > -1) return

    let styleElement = document.createElement("style");
    styleElement.innerHTML = text;
    document.head.appendChild(styleElement);

    memory.push(text);
};