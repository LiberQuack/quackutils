import {CustomElement} from "../../../src/ui/ui-types";
import {css} from "../../../src/ui/util/css";
import {useEffect, useRef, useState} from "haunted/lib/core";
import debounce from "debounce";

export type SmartOverflowEvents = {
    onchange: (e: CustomEvent<{ visibleItems: JSX.Element[], overflowedItems: JSX.Element[] }>) => void
};
/**
 * HideResponsive expect to receive same array instance between renders
 * @example
 *  let items = useMemo(() => [
 *    <div style$="background: red; border: 1px solid yellow; width: 200px; height: 50px; display: inline-block"/>,
 *    <div style$="background: red; border: 1px solid yellow; width: 200px; height: 50px; display: inline-block"/>,
 *    <div style$="background: red; border: 1px solid yellow; width: 200px; height: 50px; display: inline-block"/>,
 *  ], []);
 *
 *  <HideResponsive items={items}/>
 * @param props
 * @constructor
 */
export const SmartOverflow: CustomElement<{ items: JSX.Element[] }, SmartOverflowEvents> = function (props) {
    css`
        smart-overflow {
            display: block;
            overflow: hidden;
        }
    `

    const [, forceRender] = useState({});
    const lastContainerWidth = useRef(0);
    const overflowedItemsRef = useRef([] as any[]);

    const getVisibleItems = () => {
        return props.items.filter(it => !overflowedItemsRef.current.find(overflowed => overflowed === it));
    };

    const showAll = () => {
        overflowedItemsRef.current = [];
        forceRender({});
    }

    const collectOverflowedItems = () => {
        const {width} = this.getBoundingClientRect();
        const children = Array.from(this.children);

        let widthAcc = 0;
        const beyondThresholdItems = [];

        for (let i = 0; i < children.length; i++) {
            let child = children[i];
            let childWidth = Math.floor(child.getBoundingClientRect().width);
            widthAcc += childWidth;
            if (widthAcc > width) {
                beyondThresholdItems.push((props.items)[i]);
            }
        }

        const overflowed = [...overflowedItemsRef.current, ...beyondThresholdItems];
        overflowedItemsRef.current = props.items.filter(it => overflowed.indexOf(it) > -1);
        forceRender({});
    };

    const dispatchOnChange = () => {
        const changeEvent: Parameters<SmartOverflowEvents["onchange"]>[0] = new CustomEvent("change", {
            detail: {
                visibleItems: getVisibleItems(),
                overflowedItems: overflowedItemsRef.current
            }
        });
        this.dispatchEvent(changeEvent);
    }

    const onResize = () => {
        const containerRect = this.getBoundingClientRect();
        const currentContainerWidth = containerRect.width;
        const isIncreasing = currentContainerWidth > lastContainerWidth.current;

        isIncreasing && requestAnimationFrame(showAll);
        requestAnimationFrame(collectOverflowedItems);
        requestAnimationFrame(dispatchOnChange);

        lastContainerWidth.current = currentContainerWidth;
    }

    useEffect(() => {
        const {width} = this.getBoundingClientRect();
        lastContainerWidth.current = width;
        const observer = new ResizeObserver(debounce(onResize, 150));
        observer.observe(this);
        return () => observer.disconnect();
    }, []);

    let visibleItems = getVisibleItems();

    return <>
        {visibleItems}
    </>;
};