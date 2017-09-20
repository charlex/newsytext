import React from 'react';
import { State, Block, Mark, Inline, Text, Character } from 'slate';
import PropTypes from 'prop-types';
import { Editor } from 'slate-react';
import Dropcap from './plugins/dropcap';


import './NewsyTextEditor.css';


const initialState = {
  document: {
    nodes: [
      {
        kind: 'block',
        type: 'title',
        nodes: [
          {
            kind: 'text',
            ranges: [
              {
                text: 'Headline',
              },
            ],
          },
        ],
      },
      {
        kind: 'block',
        type: 'paragraph',
        nodes: [
          {
            kind: 'text',
            ranges: [
              {
                text: 'Lede',
              },
            ],
          },
        ],
      },
    ],
  },
};


class NewsyTextEditor extends React.Component {
  static propTypes = {
    // onChange: PropTypes.func.isRequired,
    // editorState: PropTypes.shape().isRequired,
  }

  state = {
    state: State.fromJSON(initialState),
    schema: {
      nodes: {
        title: props => <h2 {...props.attrs}>{props.children}</h2>,
        paragraph: props => <p {...props.attrs}>{props.children}</p>,
        dropcap: props => <span className="dropcap" {...props.attrs}>{props.children}</span>,
      },
      rules: [
        {
          match: node => node.kind === 'document',
          validate: document => (!document.nodes.size || document.nodes.first().type !== 'title' ? document.nodes : null),
          normalize: (change, document, nodes) => {
            if (!nodes.size) {
              const title = Block.create({ type: 'title', data: {} });
              return change.insertNodeByKey(document.key, 0, title);
            }

            return change.setNodeByKey(nodes.first().key, 'title');
          },
        },

        /* Rule that only allows for one title, normalizes by making titles paragraphs */

        {
          match: node => node.kind === 'document',
          validate: (document) => {
            const invalidChildren = document.nodes.filter((child, index) => child.type === 'title' && index !== 0);
            return invalidChildren.size ? invalidChildren : null;
          },
          normalize: (change, document, invalidChildren) => {
            let updatedTransform = change;
            invalidChildren.forEach((child) => {
              updatedTransform = change.setNodeByKey(child.key, 'paragraph');
            });

            return updatedTransform;
          },
        },

        /* Rule that forces at least one paragraph, normalizes by inserting an empty paragraph */

        {
          match: node => node.kind === 'document',
          validate: document => (document.nodes.size < 2 ? true : null),
          normalize: (change, document) => {
            const paragraph = Block.create({ type: 'paragraph', data: {} });
            return change.insertNodeByKey(document.key, 1, paragraph);
          },
        },
      ],
    },

  }


  onChange = ({ state }) => {
    this.setState({ state });
  }

  render() {
    return (
      <div className="NewsyTextEditor">
        <Editor
          state={this.state.state}
          schema={this.state.schema}
          onChange={this.onChange}
          plugins={[Dropcap()]}
        />
      </div>
    );
  }
}

export default NewsyTextEditor;
