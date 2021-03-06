import React, { Component, PropTypes } from 'react';

const styles = {
  container: {
    display: 'inline-block',
    overflow: 'hidden',
    userSelect: 'none',
    webkitUserSelect: 'none',
    mozUserSelect: 'none',
    msUserSelect: 'none',
    webkitTouchCallout: 'none',
    webkitTapHighlightColor: 'rgba(0, 0, 0, 0)'
  },
  inner: {
    transitionProperty: 'all',
    transitionDuration: '1s',
    animationFillMode: 'backwards',
    transitionTimingFunction: 'cubic-bezier(0.14, 0.52, 0.62, 0.91)'
  }
}

const hasTouchEvents = () => {
  return 'ontouchstart' in window || window.DocumentTouch;
}

export default class ImageDepth extends Component {

  static propTypes = {
    /** */
    children: PropTypes.node.isRequired,
    /** Default scale of the inner container  */
    scale: PropTypes.number,
    /** Perspective :) */
    perspective: PropTypes.number,
    /** A relative value of -10px to 10px on the x-axis
     * negative value reverses the direction */
    translateX: PropTypes.number,
    /** A relative value of -10px to 10px on the y-axis **/
    translateY: PropTypes.number,
    /** A relative value of -20px to 20px on the z-axis
     * Translation is done when the mouse moves vert */
    translateZ: PropTypes.number,
    /** A relative rotation of -2deg to 2deg on the x-axis */
    rotateX: PropTypes.number,
    /** A relative rotation of -2deg to 2deg on the y-axis */
    rotateY: PropTypes.number,
    /** z-axis rotation; by default there's no rotation on the z-axis */
    rotateZ: PropTypes.number,
    /** Instensity added to x, y and z axis */
    intensity: PropTypes.number
  }

  static defaultProps = {
    scale: 1.05,
    perspective: 1000,
    translateX: -10,
    translateY: -10,
    translateZ: 10,
    rotateX: 2,
    rotateY: 2,
    rotateZ: 0,
    intensity: 2.25
  }

  constructor(props) {
    super(props);

    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
  }

  componentDidMount() {
    const { container } = this;
    if (container) {
      container.addEventListener('mousemove', this.onMouseMove);
      container.addEventListener('mouseleave', this.onMouseLeave);
      if (hasTouchEvents) {
        container.addEventListener('touchmove', this.onMouseMove);
        container.addEventListener('touchend', this.onMouseLeave);
      }
    }
  }

  componentWillUnmount() {
    const { container } = this;
    if (container) {
      container.removeEventListener('mousemove', this.onMouseMove);
      container.removeEventListener('mouseleave', this.onMouseMove);
      if (hasTouchEvents) {
        container.removeEventListener('touchmove', this.onMouseMove);
        container.removeEventListener('touchend', this.onMouseLeave);
      }
    }
  }

  onMouseMove(e) {

    const { container, inner } = this;

    const {
      scale,
      perspective,
      rotateX,
      rotateY,
      rotateZ,
      translateX,
      translateY,
      translateZ,
      intensity
    } = this.props;

    const offset = {
      width: container.offsetWidth,
      height: container.offsetHeight
    };

    const bounds = container.getBoundingClientRect();

    const mousePos = this.getMousePos(e);

    const documentScroll = {
      left: document.body.scrollLeft + document.documentElement.scrollLeft,
      top: document.body.scrollTop + document.documentElement.scrollTop
    };

    // Mouse position relative to the container element
    const mousePosRel = {
      x: mousePos.x - bounds.left - documentScroll.left,
      y: mousePos.y - bounds.top - documentScroll.top
    };

    requestAnimationFrame(() => {

      const rX = intensity * rotateX / offset.height * mousePosRel.y - rotateX;
      const rY = intensity * rotateY / offset.width * mousePosRel.x - rotateY;
      const rZ = intensity * rotateZ / offset.width * mousePosRel.x - rotateZ;
      const tX = intensity * translateX / offset.width * mousePosRel.x - translateX;
      const tY = intensity * translateY / offset.height * mousePosRel.y - translateY;
      const tZ = intensity * translateZ / offset.height * mousePosRel.y - translateZ;

      inner.style.transform = `
        perspective(${perspective}px)
        translate3d(${tX}px, ${tY}px, ${tZ}px)
        rotate3d(1, 0, 0, ${rX}deg)
        rotate3d(0, 1, 0, ${rY}deg)
        rotate3d(0, 0, 1, ${rZ}deg)
        scale(${scale})
      `;

    });
  }

  onMouseLeave(e) {
    const { inner } = this;
    const { perspective, scale } = this.props;

    setTimeout(() => {
      inner.style.transform = `
        perspective(${perspective}px)
        translate3d(0, 0, 0)
        rotate3d(1, 1, 1, 0deg)
        scale(${scale})`;
    }, 60);
  }

  getMousePos(e) {
    if (hasTouchEvents) {
      console.log(e.originalEvent);
    }
    let posx = 0;
    let posy = 0;
    if (e.pageX || e.pageY)   {
      posx = e.pageX;
      posy = e.pageY;
    } else if (e.clientX || e.clientY) {
      posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
      posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }
    return {
      x: posx,
      y: posy,
    };
  }

  renderChildren() {
    const { children, scale } = this.props;
    const innerStyle = {
      transform: `scale(${scale})`,
      ...styles.inner
    };
    const innerRef = div => { this.inner = div }
    return React.cloneElement(children, {
      style: innerStyle,
      ref: innerRef
    })
  }

  render() {

    const containerStyle = {
      ...styles.container
    };

    return (
      <div
        ref={div => { this.container = div } }
        style={containerStyle}
      >
        {this.renderChildren()}
      </div>
    );
  }
}
