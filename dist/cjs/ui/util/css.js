define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.css = void 0;
    let memory = [];
    const css = (template, ...values) => {
        let text = "";
        if (Array.isArray(template)) {
            for (let i = 0; i < template.length; i++) {
                text += template[i];
                text += i === template.length - 1 ? "" : values[i];
            }
        }
        else {
            text = template;
        }
        if (memory.indexOf(text) > -1)
            return;
        let styleElement = document.createElement("style");
        styleElement.innerHTML = text;
        document.head.appendChild(styleElement);
        memory.push(text);
    };
    exports.css = css;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3NzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3VpL3V0aWwvY3NzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7SUFBQSxJQUFJLE1BQU0sR0FBYSxFQUFFLENBQUM7SUFFbkIsTUFBTSxHQUFHLEdBQUcsQ0FBQyxRQUF1QyxFQUFFLEdBQUcsTUFBMkIsRUFBRSxFQUFFO1FBRTNGLElBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUVkLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUN6QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDdEMsSUFBSSxJQUFJLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDcEIsSUFBSSxJQUFJLENBQUMsS0FBSyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDdEQ7U0FDSjthQUFNO1lBQ0gsSUFBSSxHQUFHLFFBQWtCLENBQUE7U0FDNUI7UUFFRCxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQUUsT0FBTTtRQUVyQyxJQUFJLFlBQVksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ25ELFlBQVksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1FBQzlCLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBRXhDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdEIsQ0FBQyxDQUFDO0lBcEJXLFFBQUEsR0FBRyxPQW9CZCJ9