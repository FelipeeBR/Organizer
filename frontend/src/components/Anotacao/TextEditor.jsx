import React, { Component } from 'react';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';

export class TextEditor extends Component {
    state = {
      editorState: EditorState.createEmpty(),
    }
  
    onEditorStateChange = (editorState) => {
      this.setState({
        editorState,
      });
    };
  
    render() {
      const { editorState } = this.state;
      console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));
      return (
        <div className='bg-white'>
          <Editor
            editorState={editorState}
            wrapperClassName="demo-wrapper"
            editorClassName="demo-editor"
            onEditorStateChange={this.onEditorStateChange}
          />
          <textarea
            disabled
            value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
          />
        </div>
      );
    }
}