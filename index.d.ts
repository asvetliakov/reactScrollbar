import * as React from "react";

interface ScrollValue {
    /**
     * content left position (distance in pixels from the left side of container)
     */
    leftPosition: number;
    /**
     * content top position (distance in pixels from the top of container)
     */
    topPosition: number;
    /**
     * container height
     */
    containerHeight: number;
    /**
     * container width
     */
    containerWidth: number;
    /**
     * real content height
     */
    realHeight: number;
    /**
     * real content width
     */
    realWidth: number;
}

interface ScrollAreaProps {
    /**
     * CSS class names added to main scroll area component.
     */
    className?: string;
    /**
     * Inline styles applied to the main scroll area component. Will be merged with default styles
     */
    style?: React.CSSProperties;
    /**
     * Scroll speed applied to mouse wheel event.
     * @default 1
     */
    speed?: number;
    /**
     * CSS class names added to element with scroll area content.
     */
    contentClassName?: string;
    /**
     * Inline styles applied to element with scroll area content. Will be merged with default styles
     */
    contentStyle?: React.CSSProperties;
    /**
     * Inline style applied to scrollbar container when content area is hovered
     */
    contentHoverStyle?: React.CSSProperties;
    /**
     * When set to false, vertical scrollbar will not be available, regardless of the content height
     * @default true
     */
    vertical?: boolean;
    /**
     * Inline styles applied to vertical scrollbar's container. Will be merged with default styles
     */
    verticalContainerStyle?: React.CSSProperties;
    /**
     * Inline style applied to vertical scrollbar container when scrollbar is active while dragging
     */
    verticalContainerActiveStyle?: React.CSSProperties;
    /**
     * Inline style applied to vertical scrollbar container when scrollbar is active while hovered
     */
    verticalContainerHoverStyle?: React.CSSProperties;
    /**
     * Inline styles applied to vertical scrollbar. Will be merged with default styles
     */
    verticalScrollbarStyle?: React.CSSProperties;
    /**
     * When set to false, horizontal scrollbar will not be available
     * @default true
     */
    horizontal?: boolean;
    /**
     * Inline styles applied to horizontal scrollbar's container. Will be merged with default styles
     */
    horizontalContainerStyle?: React.CSSProperties;
    /**
     * Inline style applied to horizontal scrollbar container when scrollbar is active while dragging
     */
    horizontalContainerActiveStyle?: React.CSSProperties;
    /**
     * Inline style applied to horizontal scrollbar container when scrollbar is active while hovered
     */
    horizontalContainerHoverStyle?: React.CSSProperties;
    /**
     * Inline styles applied to horizontal scrollbar. Will be merged with default styles
     */
    horizontalScrollbarStyle?: React.CSSProperties;
    /**
     * Event which can notify the parent component when the container scrolls.
     * @param value informations about current position
     */
    onScroll?: (value: ScrollValue) => void;
    /**
     * You can override window to make scrollarea works inside iframe
     * @default window
     */
    contentWindow?: any;
    /**
     * You can override document to make scrollarea works inside iframe
     * @default document
     */
    ownerDocument?: any;
    /**
     * When set to true, smooth scrolling for both scrollbars is enabled
     * @default true
     */
    smoothScrolling?: boolean;
    /**
     * Using this prop it's possible to set minimal size in px for both scrollbars.
     */
    minScrollSize?: number;
    /**
     * After set to true, mouse wheel event has swapped directions.
     * So normal scrolling moves horizontal scrollbar and scrolling with SHIFT key moves vertical scrollbar.
     * It could be useful for applications with horizontal layout
     * @default false
     */
    swapWheelAxes?: boolean;
}

interface ScrollAreaMethods {
    /**
     * That method allows manual refreshing of the scrollbar.
     */
    refresh(): void;
    /**
     * It allows to scroll to the top of ScrollArea component.
     */
    scrollTop(): void;
    /**
     * It allows to scroll to the bottom of ScrollArea component.
     */
    scrollBottom(): void;
    /**
     * It moves vertical scrollbar.
     * @param topPosition topPosition is a distance between the top of scrollArea container and the top of scrollArea content.
     */
    scrollYTo(topPosition: number): void;
    /**
     * It allows to scroll to the left of ScrollArea component.
     */
    scrollLeft(): void;
    /**
     * It allows to scroll to the right of ScrollArea component.
     */
    scrollRight(): void;
    /**
     * It moves horizontal scrollbar.
     * @param leftPosition leftPosition is a distance between left edge of scrollArea container and left edge of scrollArea content.
     */
    scrollXTo(leftPosition: number): void;
}

export default class ScrollArea extends React.Component<ScrollAreaProps, {}> implements ScrollAreaMethods {
    refresh(): void
    scrollTop(): void
    scrollBottom(): void
    scrollYTo(topPosition: number): void
    scrollLeft(): void
    scrollRight(): void
    scrollXTo(leftPosition: number): void
}
