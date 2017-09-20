import { Mark, Selection } from 'slate';
import { Range } from 'immutable';
import React from 'react';


class DropCapMark extends React.Component {
  render() {
    return <span className="dropcap">{this.props.children}</span>;
  }
}

function Dropcap(options = {}) {
  console.log('Dropcap');
  const {
    type = 'dropcap',
    hrefProperty = 'href',
  } = options;

  // function hasLinks(state) {
  //   return state.inlines.some(inline => inline.type == type);
  // }
  //
  // function unwrapLink(change) {
  //   change.unwrapInline(type);
  // }
  //
  // function wrapLink(change, href) {
  //   change.wrapInline({
  //     type,
  //     data: { [hrefProperty]: href },
  //   });
  // }

  return {
    schema: {
      marks: {
        dropcap: DropCapMark,
      },
      rules: [
        {
          match: object => object.kind === 'document',
          validate: (document) => {
            let invalidChildren = document.nodes.filter(child => child.type === 'paragraph');
            invalidChildren = invalidChildren.filter((child, index) => index === 0);
            invalidChildren = invalidChildren.filter((child) => {
              const text = child.getFirstText();
              const first = text.characters.get(0);
              if (first.marks.first()) {
                console.log(first.marks.first().characters);
              }
              return !(first.marks.first() && first.marks.first().type === 'dropcap');
            });
            return invalidChildren.size ? invalidChildren : null;
          },
          normalize: (change, node, invalidChildren) => {
            let updatedTransform = change;
            invalidChildren.forEach((child) => {
              const text = child.getTextAtOffset(0);
              // let { characters } = text;
              // let first = characters.get(0);
              // let { marks } = first;
              // const mark = Mark.create({ type: 'dropcap' });
              // marks = marks.add(mark);
              // first = first.merge({ marks });
              // characters = characters.set(0, first);

              updatedTransform = change.addMarkByKey(text.key, 0, 1, { type: 'dropcap' });
              updatedTransform = change.setNodeByKey(child.key, 'paragraph');
            });

            return updatedTransform;
            // // console.log(node.kind);
            // // let { characters } = text;
            // let first = characters.get(0);
            // let { marks } = first;
            // const mark = Mark.create({ type: 'dropcap' });
            // marks = marks.add(mark);
            // first = first.merge({ marks });
            // characters = characters.set(0, first);
            // // return characters;
          },
        },
      ],
    },
  };
}

export default Dropcap;
