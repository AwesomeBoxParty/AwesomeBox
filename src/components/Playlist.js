import React, {Component} from 'react';
import GifDropzone from './GifDropzone';

export default class GifBoard extends Component {

  constructor(props) {
    super(props);
    const gifs = []
    for (let i = 0; i < this.props.cellCount; i++) {
      gifs.push(null);
    }
    this.state = { gifs };
  }

  dropGif(index, newGif) {
    const gifs = this.state.gifs.map((gif, i) => {
      if (i === index) {
        return newGif;
      } else return gif;
    });
    this.setState({ gifs });
  }

  render() {
    const gifs = this.state.gifs.map((gif, index) => {
      return (
        <GifDropzone
          src={gif ? gif.originalGifUrl : ''}
          index={index}
          dropGif={::this.dropGif}
        />
      );
    });

    return (
      <div>
        { gifs }
      </div>
    );
  }
}
