import React, { Component, PropTypes } from 'react';
import { DragSource } from 'react-dnd';
import DraggableTypes from '../constants/DraggableTypes';

// Decorate component with DragSource functionality
// See react-dnd docs: http://gaearon.github.io/react-dnd/docs-overview.html
@DragSource(DraggableTypes.GIF, { // implement DragSource interface
  beginDrag(props, monitor, component) {
    // return data that identifies this draggable
    const item = {
      id: props.id,
      originalGifUrl: props.originalGifUrl,
    };
    console.log('Dragging', item);
    return item;
  }
}, function registerWithDnD(connect, monitor) {
  return { // These props are injected into our component
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
  };
})
export default class GifSwatch extends Component {
  static propTypes = {
    thumbnailUrl: PropTypes.string.isRequired,
    previewGifUrl: PropTypes.string.isRequired,
    originalGifUrl: PropTypes.string.isRequired,
    // Injected by React DnD:
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired
  };

  constructor() {
    super();
    this.state = {
      mouseOver: false
    }
  }

  mouseOver() {
    this.setState({
      mouseOver: true
    });
  }

  mouseOut() {
    this.setState({
      mouseOver: false
    });
  }

  render() {
    const { isDragging, connectDragSource, thumbnailUrl, previewGifUrl } = this.props;

    const draggingStyles = {
      opacity: .5,
      background: '#6B45C9',
      zIndex: 2
    };

    const styles = {
      boxSizing: 'border-box',
      padding: '6px 12px 6px 12px',
      width: '100%',
      background: '#333',
      ...(isDragging ? draggingStyles : {})
    }

    return connectDragSource(
      <div
        style={styles}
        onMouseOver={::this.mouseOver}
        onMouseOut={::this.mouseOut}
      >
        <img
          src={ this.state.mouseOver ? previewGifUrl : thumbnailUrl }
          style={{width: '100%'}}
        />
      </div>
    );
  }
}
