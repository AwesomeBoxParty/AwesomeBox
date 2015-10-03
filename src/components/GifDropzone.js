import React, { Component, PropTypes } from 'react';
import DraggableTypes from '../constants/DraggableTypes';
import { DropTarget } from 'react-dnd';

import './GifDropzone.scss';

// Decorate component with DropTarget functionality
// See react-dnd docs: http://gaearon.github.io/react-dnd/docs-overview.html
@DropTarget(DraggableTypes.GIF, { // implement DropTarget interface
  drop(props, monitor, component) {
    const gif = monitor.getItem();
    console.log('Dropped', gif.originalGifUrl);
    props.dropGif(props.index, gif);
  }
}, function registerWithDnD(connect, monitor) {
  return { // These props are injected into our component
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
  };
})
export default class GifDropzone extends Component {
  static propTypes = {
    src: PropTypes.string,
    // Injected by React DnD:
    connectDropTarget: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired,
    canDrop: PropTypes.bool.isRequired
  };

  render() {
    const { connectDropTarget, isOver, canDrop, src } = this.props;
    const overlayStyles = {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      backgroundColor: 'rgba(255, 255, 255, .5)',
    };
    const backgroundGifStyles = {
      position: 'relative',
      backgroundImage: `url(${src})`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: '50% 50%',
      backgroundSize: 'cover',
    };
    return connectDropTarget(
      <div className="GifDropzone" style={backgroundGifStyles} >
        <div style={isOver && canDrop ? overlayStyles : { display: 'none' }} />
      </div>
    );
  }
}
