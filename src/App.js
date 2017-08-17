import React, { Component } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import './App.css';
import NewsyTextEditor from './NewsyTextEditor';
import NewsyTextToolbar from './NewsyTextToolbar';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
    };
  }
  onChange(editorState) {
    this.setState({ editorState });
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Bolt</h2>
          <NewsyTextToolbar
            editorState={this.state.editorState}
            onChange={eS => this.onChange(eS)}
          />
        </div>
        <div className="App-inner">
          <div className="App-gutter" />
          <div className="App-contents">
            <NewsyTextEditor
              editorState={this.state.editorState}
              onChange={eS => this.onChange(eS)}
            />
          </div>
          <div className="App-gutter" />
        </div>
      </div>
    );
  }
}

export default App;
