
export const styles = {
    scrollAreaContent: {
        margin: 0,
        padding: 0,
        overflow: "hidden",
        position: "relative"
    },
    scrollArea: {
        position: "relative",
        overflow: "hidden"
    },
    scrollAreaHover: {
        opacity: 0.3
    },
    scrollBarContainer: {
        position: "absolute",
        background: "black",
        opacity: 0.1,
        zIndex: 9999,
        WebkitTransition: "all .4s",
        MozTransition: "all .4s",
        MsTransition: "all .4s",
        OTransition: "all .4s",
        transition: "all .4s"
    },
    horizontalScrollBarContainer: {
        width: "100%",
        height: 10,
        left: 0,
        bottom: 0
    },
    horizontalScrollBar: {
        width: 20,
        height: 8,
        background: "black",
        marginTop: 1
    },
    verticalScrollBarContainer: {
        width: 10,
        height: "100%",
        right: 0,
        top: 0
    },
    verticalScrollBar: {
        width: 8,
        height: 20,
        background: "black",
        marginLeft: 1
    },
    scrollBarContainerHover: {
        background: "gray",
        opacity: 0.6
    },
    scrollBarContainerActive: {
        background: "gray",
        opacity: 0.6
    },
};