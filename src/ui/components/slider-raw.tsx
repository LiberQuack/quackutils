import {useEffect, useRef, useState} from "haunted/lib/core";
import {CustomElementDefinition, CustomEventType} from "../ui-types";
import {css} from "../../../src/ui/util/css";
import {debounce} from "debounce";
import {Undefinable} from "../../_/types";
// import Swiper from "swiper";
// import "swiper/swiper.min.css";

export type SliderProps = { index: number, content: any[] };

export const SliderIndicator: CustomElementDefinition<{ index: number, length: number }> = (props) => {
    css`
        slider-indicator {
            text-align: center;
            display: block;
        }
        
        slider-indicator .slider-indicator-item.isActive {
            opacity: 1;
        }

        slider-indicator .slider-indicator-item {
            display: block;
            height: .5em;
            width: .5em;
            margin: .25em;
            border-radius: .25em;
            background: #bbb;
            opacity: .5;
            transform: scale(1,1);
            transition: ease .25s;
        }
    `

    let items = [];

    for (let i = 0; i < props.length; i++) {
        items.push(
            <span class$={`slider-indicator-item ${props.index === i ? "isActive" : ""}`}/>
        )
    }

    return (
        <div class$="l-flex-center">
            <div class$="l-flex-between">
                {items}
            </div>
        </div>
    )
}

type SliderEvents = { onselect?: (e: CustomEvent<{ index: number }>) => void };

export const SliderElement: CustomElementDefinition<{items: any[], index?: number;}, SliderEvents> = function (props) {
    css`
        slider-element {
            display: block;
            position: relative;
            scroll-snap-type: x mandatory;
            scroll-behavior: smooth;
            overflow-x: scroll;
            -ms-overflow-style: none !important;  /* IE and Edge */
            scrollbar-width: none !important;  /* Firefox */
        }

        slider-element::-webkit-scrollbar {
            display: none !important;
        }
        
        slider-element > .se-container {
            display: grid;
            width: fit-content;
            grid-auto-flow: column;
            justify-items: center;
        }
        
        slider-element > .se-container > * {
            scroll-snap-align: center;
        }
    `

    const [width, setWidth] = useState(0);

    const refs = useRef({
        seContainer: undefined as Undefinable<HTMLElement>,
    });

    const updateWidth = () => {
        setWidth(this.getBoundingClientRect().width);
    };

    useEffect(() => {
        refs.current.seContainer = this.querySelector(".se-container") as HTMLElement;
        updateWidth();

        const observer = new ResizeObserver(debounce(updateWidth, 75));
        observer.observe(this);

        this.addEventListener("scroll", debounce((e: Event) => {
            const center = this.getBoundingClientRect().width / 2 + this.scrollLeft;
            const children = Array.from(refs.current.seContainer!.children) as HTMLElement[];
            const indexElmCenter = children.findIndex(it => (it.offsetLeft + it.offsetWidth / 2) > center - 1);

            const event: CustomEventType<SliderEvents, "onselect"> = new CustomEvent("select", {detail: {index: indexElmCenter}});
            this.dispatchEvent(event);
        }, 100), {passive: true});

        setTimeout(() => {
            this.scrollTo(0, 0);
        }, 100);

        return () => {
            observer.disconnect();
        }
    }, []);

    useEffect(() => {
        if (typeof props.index === "number") {
            const children = Array.from(refs.current.seContainer!.children) as HTMLElement[];
            const child = children[props.index];

            if (child) {
                child.scrollIntoView();
            }
        }
    }, [props.index]);

    return (
        <>
            <div class$="se-container" style$={`grid-auto-columns: ${width}px`}>
                {props.items}
            </div>
        </>
    )}

//TODO: Should change query url during navigation, because if user clicks on "back" button... we go to previous page instead of going back one step
export function useSliderElement(opts: Pick<SliderProps, "index"> & {length: number}) {
    const [_index, setIndex] = useState(opts.index);

    useEffect(() => {
        setIndex(_index % opts.length);
    }, [opts.length])

    return {
        props: {index: _index},
        controls: {
            next: () => setIndex((_index + 1) % opts.length),
            previous: () => setIndex(_index === 0 ? opts.length - 1 : (_index - 1) % opts.length),
            setIndex: (index: number) => setIndex(index)
        }
    }
}