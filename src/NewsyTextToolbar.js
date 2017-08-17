import React from 'react';
import PropTypes from 'prop-types';
import { RichUtils, AtomicBlockUtils, EditorState } from 'draft-js';


class NewsyTextToolbar extends React.Component {
  static propTypes = {
    editorState: PropTypes.shape().isRequired,
    onChange: PropTypes.func.isRequired,
  };
  bold() {
    this.props.onChange(
      RichUtils.toggleInlineStyle(this.props.editorState, 'BOLD'),
    );
  }
  italicize() {
    this.props.onChange(
      RichUtils.toggleInlineStyle(this.props.editorState, 'ITALIC'),
    );
  }
  addWidget() {
    const editorState = this.props.editorState;
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      'widget',
      'IMMUTABLE',
      { src: 'test' },
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(
      editorState,
      { currentContent: contentStateWithEntity },
    );
    const newNewEditorState = AtomicBlockUtils.insertAtomicBlock(
      newEditorState,
      entityKey,
      ' ',
    );
    this.props.onChange(
      newNewEditorState,
    );
  }
  render() {
    return (
      <div className="NewsyTextToolbar">
        <button onClick={() => this.bold()}>Bold</button>
        <button onClick={() => this.italicize()}>Italicize</button>
        <button onClick={() => this.addWidget()}>Add widget</button>
      </div>
    );
  }
}

export default NewsyTextToolbar;
