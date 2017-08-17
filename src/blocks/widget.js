import React from 'react';


export default class Widget extends React.Component {
  render() {
    // Return a <figure> or some other content using this data.
    return (
      <div className="Block-widget">
        <input type="text" placeholder="Image URL" />
      </div>
    );
  }
}
