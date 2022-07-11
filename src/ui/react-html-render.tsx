import {html, render, TemplateResult} from "lit";
import {useRef, Fragment, createRef, useEffect} from "react";

export function ReactHtmlRender(props: {html: TemplateResult}) {
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (ref.current) {
            render(props.html, ref.current);
        }
    }, [ref.current])

    const strings = props.html.strings;
    const linesWithContent = strings.join("").split("\n").filter(it => it.trim());
    const leftStart = Math.min(...linesWithContent?.map((it) => it.replace(/\S.*/, "").length));
    const rawTemplate = strings.map((it, index) => it + (index < strings.length -1 ? "..." : ""));
    const template = rawTemplate.join("").split("\n").map(it => it.substring(leftStart)).join("\n");

    return (
        <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1em", padding: "1em"}}>
            <pre style={{flexGrow: 1}}>{template.trimStart().trimEnd()}</pre>
            <div style={{flexGrow: 1}} ref={ref}/>
        </div>
    )
}