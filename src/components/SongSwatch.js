import React, { Component, PropTypes } from 'react';

export default class GifSwatch extends Component {
  static propTypes = {
    thumbnailUrl: PropTypes.string.isRequired,
    previewGifUrl: PropTypes.string.isRequired,
    originalGifUrl: PropTypes.string.isRequired,
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
