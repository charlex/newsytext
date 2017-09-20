import React, { Component } from 'react';
import NewsyTextEditor from './NewsyTextEditor';

import './App.css';


class App extends Component {
  onChange(editorState) {
    this.setState({ editorState });
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Bolt</h2>
        </div>
        <div className="App-inner">
          <div className="App-gutter" />
          <div className="App-contents">
            <NewsyTextEditor />
          </div>
          <div className="App-gutter" />
        </div>
      </div>
    );
  }
}

export default App;
