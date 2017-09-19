import React from 'react';


export default class Widget extends React.Component {
  state = {
    focused: false,
    imageURL: ''
  }
  componentWillMount() {
    document.addEventListener('click', (e) => { this.handleClick(e) }, false);
  }

  componentWillUnmount() {
    document.removeEventListener('click', (e) => { this.handleClick(e) }, false);
  }

  handleClick(e) {
    // Inside click
    if (this.node.contains(e.target)) {
      this.setState({ focused: true });
    // Outside click
    } else {
      this.setState({ focused: false });
    }

    if (this.props.blockProps.onFocusChange) {
      this.props.blockProps.onFocusChange(this.state.focused);
    }
  }

  handleInput(e) {
    this.setState({ imageURL: e.target.value });
  }

  render() {
    console.log('imageURL', this.state.imageURL);
    // Return a <figure> or some other content using this data.
    return (
      <div className="Block-widget" ref={(node) => { this.node = node; }}>
        <input type="text" placeholder="Image URL" value={this.state.imageURL} onChange={(e) => { this.handleInput(e); }}  />
      </div>
    );
  }
}
