import {render, TemplateResult} from "lit";
import {useEffect, useRef} from "react";
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import {nord as codeTheme} from 'react-syntax-highlighter/dist/esm/styles/prism';

export function ReactHtmlRender(props: {html: TemplateResult, hideSrc: boolean}) {
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (ref.current) {
            render(props.html, ref.current);
        }
    }, [ref.current])

    const strings = props.html.strings;
    const linesWithContent = strings.join("").split("\n").filter(it => it.trim());
    const leftStart = Math.min(...linesWithContent?.map((it) => it.replace(/\S.*/, "").length));
    const rawTemplate = strings.map((it, index) => it + (index < strings.length -1 ? props.html.values[index] : ""));
    const template = rawTemplate.join("").split("\n").map(it => it.substring(leftStart)).join("\n");

    return (
        <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1em"}}>
            {
                !props.hideSrc ?
                    <div style={{display: "flex", width: "50%", justifyItems: "stretch", flexDirection: "column"}}>
                        <SyntaxHighlighter language="html" style={codeTheme}>{template.trimStart().trimEnd()}</SyntaxHighlighter>
                    </div> :
                    undefined
            }

            <div style={{flexGrow: 1}} ref={ref}/>
        </div>
    )
}

export function ReactSrcRender(props: {src: string, language: "string"}) {
    return (
        <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1em"}}>
            <SyntaxHighlighter language={props.language} style={codeTheme}>{props.src ?? ""}</SyntaxHighlighter>
        </div>
    )
}