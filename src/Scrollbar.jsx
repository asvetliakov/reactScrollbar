import React from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import {Motion, spring} from 'react-motion';
import {modifyObjValues} from './utils';
import {styles} from "./styles";

class ScrollBar extends React.Component {
    constructor(props){
        super(props);
        let newState = this.calculateState(props);
        this.state = {
            position: newState.position,
            scrollSize: newState.scrollSize,
            isDragging: false,
            isHovered: false,
            lastClientPosition: 0
        }

        if(props.type === 'vertical'){
            this.bindedHandleMouseMove = this.handleMouseMoveForVertical.bind(this);
        } else {
            this.bindedHandleMouseMove = this.handleMouseMoveForHorizontal.bind(this);
        }

        this.bindedHandleMouseUp = this.handleMouseUp.bind(this);

        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);

        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleScrollBarContainerClick = this.handleScrollBarContainerClick.bind(this);
    }

    componentDidMount(){
        if (this.props.ownerDocument) {
            this.props.ownerDocument.addEventListener("mousemove", this.bindedHandleMouseMove);
            this.props.ownerDocument.addEventListener("mouseup", this.bindedHandleMouseUp);
        } 
    }

    shouldComponentUpdate(nextProps, nextState) {
        return shallowCompare(this, nextProps, nextState);
    }

    componentWillReceiveProps(nextProps){
        this.setState(this.calculateState(nextProps));
    }

    componentWillUnmount(){
        if (this.props.ownerDocument) {
            this.props.ownerDocument.removeEventListener("mousemove", this.bindedHandleMouseMove);
            this.props.ownerDocument.removeEventListener("mouseup", this.bindedHandleMouseUp);
        }
    }

    calculateFractionalPosition(realContentSize, containerSize, contentPosition){
        let relativeSize = realContentSize - containerSize;
        
        return 1 - ((relativeSize - contentPosition) / relativeSize);
    }

    calculateState(props){
        let fractionalPosition = this.calculateFractionalPosition(props.realSize, props.containerSize, props.position); 
        let proportionalToPageScrollSize = props.containerSize * props.containerSize / props.realSize;
        let scrollSize = proportionalToPageScrollSize < props.minScrollSize ? props.minScrollSize : proportionalToPageScrollSize;

        let scrollPosition = (props.containerSize - scrollSize) * fractionalPosition;    
        return {
            scrollSize: scrollSize,
            position: Math.round(scrollPosition)
        };
    }

    render(){
        let {smoothScrolling, type, scrollbarStyle, containerStyle, containerStyleHover, containerStyleActive} = this.props;
        let {isDragging, isHovered} = this.state;
        let isHorizontal = type === 'horizontal';
        let isVertical = type === 'vertical';
        let scrollStyles = this.createScrollStyles();
        let springifiedScrollStyles = smoothScrolling ? modifyObjValues(scrollStyles, x => spring(x)) : scrollStyles;

        let scrollbarClasses = `scrollbar-container ${isDragging ? 'active' : ''} ${isHorizontal ? 'horizontal' : ''} ${isVertical ? 'vertical' : ''}`;

        // TODO: creates new object, consider optimization
        let finalContainerStyle = {...styles.scrollBarContainer, ...containerStyle};
        if (isDragging) {
            finalContainerStyle = {...finalContainerStyle, ...styles.scrollBarContainerActive, ...containerStyleActive};
        } else if (isHovered) {
            finalContainerStyle = {...finalContainerStyle, ...styles.scrollBarContainerHover, ...containerStyleHover};
        }


        return (
            <Motion style={springifiedScrollStyles}>
                    { style =>
                        <div className={scrollbarClasses}
                             style={finalContainerStyle}
                             onMouseDown={this.handleScrollBarContainerClick}
                             onMouseEnter={this.handleMouseEnter}
                             onMouseLeave={this.handleMouseLeave}
                             ref={ x => { this.scrollbarContainer = x}}>

                            <div className="scrollbar"
                                 style={{...scrollbarStyle, ...style}}
                                 onMouseDown={this.handleMouseDown}
                            >
                            </div>
                        </div>
                    }
            </Motion>
        );
    }
    
    handleScrollBarContainerClick(e) {
        e.preventDefault();        
        let multiplier = this.computeMultiplier();
        let clientPosition = this.isVertical() ? e.clientY : e.clientX;
        let { top, left } = this.scrollbarContainer.getBoundingClientRect();
        let clientScrollPosition = this.isVertical() ? top : left;        
        
        let position = clientPosition - clientScrollPosition;
        let proportionalToPageScrollSize = this.props.containerSize * this.props.containerSize / this.props.realSize;
        
        this.setState({isDragging: true, lastClientPosition: clientPosition });
        this.props.onPositionChange((position - proportionalToPageScrollSize / 2) / multiplier);
    }

    handleMouseMoveForHorizontal(e){
        let multiplier = this.computeMultiplier();
        
        if(this.state.isDragging){
            e.preventDefault();
            let deltaX = this.state.lastClientPosition - e.clientX;
            this.setState({ lastClientPosition: e.clientX });
            this.props.onMove(0, deltaX / multiplier);
        }
    }

    handleMouseMoveForVertical(e){
        let multiplier = this.computeMultiplier();
        
        if(this.state.isDragging){
            e.preventDefault();
            let deltaY = this.state.lastClientPosition - e.clientY;
            this.setState({ lastClientPosition: e.clientY });
            this.props.onMove(deltaY / multiplier, 0);
        }
    }

    handleMouseDown(e){
        e.preventDefault();
        e.stopPropagation();
        let lastClientPosition = this.isVertical() ? e.clientY: e.clientX;
        this.setState({isDragging: true, lastClientPosition: lastClientPosition });
    }

    handleMouseUp(e){
        e.preventDefault();
        this.setState({isDragging: false });
    }

    handleMouseEnter(e) {
        e.preventDefault();
        e.stopPropagation();
        this.setState({ isHovered: true });
    }

    handleMouseLeave(e) {
        e.preventDefault();
        e.stopPropagation();
        this.setState({ isHovered: false });
    }

    createScrollStyles(){
        if(this.props.type === 'vertical'){
            return {
                height: this.state.scrollSize,
                marginTop: this.state.position
            };
        } else {
            return {
                width: this.state.scrollSize,
                marginLeft: this.state.position
            };
        }
    }
    
    computeMultiplier(){
        return (this.props.containerSize) / this.props.realSize;
    }
    
    isVertical(){
       return this.props.type === 'vertical';
    }
}

ScrollBar.propTypes = {
    onMove: React.PropTypes.func,
    onPositionChange: React.PropTypes.func,
    realSize: React.PropTypes.number,
    containerSize: React.PropTypes.number,
    position: React.PropTypes.number,
    containerStyle: React.PropTypes.object,
    containerHoverStyle: React.PropTypes.object,
    containerActiveStyle: React.PropTypes.object,
    scrollbarStyle: React.PropTypes.object,
    type: React.PropTypes.oneOf(['vertical', 'horizontal']),
    ownerDocument: React.PropTypes.any,
    smoothScrolling: React.PropTypes.bool,
    minScrollSize: React.PropTypes.number
};

ScrollBar.defaultProps = {
    type : 'vertical',
    smoothScrolling: false
};
export default ScrollBar;
