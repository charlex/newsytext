import React from 'react';
import PropTypes from 'prop-types';
import { Editor, RichUtils } from 'draft-js';
import 'draft-js/dist/Draft.css';

import blocks from './blocks';
import './NewsyTextEditor.css';


/**
 * Name ideas:
 *  - BoltText
 *  - WordBolt
 *  - BoltEditor
 *  - Bolt
 */

class NewsyTextEditor extends React.Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    editorState: PropTypes.shape().isRequired,
  }
  state = {
    readonly: true,
  }
  mediaBlockRenderer(block) {
    if (block.getType() === 'atomic') {
      return {
        component: blocks.Widget,
        readOnly: true,
        editable: false,
        props: {
          foo: 'bar',
          onFocusChange: (isFocused) => {
            this.setState({ readonly: isFocused });
          },
        },
      };
    }
    return null;
  }
  handleKeyCommand(command) {
    const newState = RichUtils.handleKeyCommand(this.props.editorState, command);
    if (newState) {
      this.props.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }
  render() {
    return (
      <div className="NewsyTextEditor">
        <Editor
          handleKeyCommand={null}
          placeholder="Start a document..."
          blockRendererFn={block => this.mediaBlockRenderer(block)}
          readonly={this.state.readonly}
          editorState={this.props.editorState}
          handleKeyCommand={cmd => this.handleKeyCommand(cmd)}
          onChange={es => this.props.onChange(es)}
        />
      </div>
    );
  }
}

export default NewsyTextEditor;
