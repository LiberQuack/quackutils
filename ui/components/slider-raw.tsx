import {useEffect, useRef, useState} from "haunted/lib/core";
import {CustomElement} from "../ui-types";
import {css} from "../../../src/ui/util/css";
// import Swiper from "swiper";
// import "swiper/swiper.min.css";

export type SliderProps = { index: number, content: any[] };

type SliderControls = {
    next: () => void,
    previous: () => void,
};

export const SliderIndicator: CustomElement<{ index: number, length: number }> = (props) => {
    css`
        slider-indicator {
            text-align: center;
        }
        
        slider-indicator .slider-indicator-item.isActive {
            transform: scale(1.5, 1);
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


export const SliderRaw: CustomElement<SliderProps> = function (props) {
    css`
        slider-raw {
            display: block;
        }
    `;

    useEffect(() => {
        const swiperContainer = this.querySelector(".swiper-container") as HTMLElement;
        // new Swiper(swiperContainer)
    }, [])

    return (
        <div class="swiper-container">

            <div class="swiper-wrapper">
                <div class="swiper-slide">Slide 1</div>
                <div class="swiper-slide">Slide 2</div>
                <div class="swiper-slide">Slide 3</div>
            </div>

            <div class="swiper-pagination"></div>

            <div class="swiper-button-prev"></div>
            <div class="swiper-button-next"></div>

            <div class="swiper-scrollbar"></div>
        </div>
    )
}

//TODO: Should change query url during navigation, because if user clicks on "back" button... we go to previous page instead of going back one step
export function useSliderElement(opts: Pick<SliderProps, "index">): { props: Pick<SliderProps, "index">, controls: SliderControls } {
    const [_index, setIndex] = useState(opts.index);

    return {
        props: {index: _index},
        controls: {
            next: () => setIndex(_index + 1),
            previous: () => setIndex(_index - 1)
        }
    }
}