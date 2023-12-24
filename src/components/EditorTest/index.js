import {MarkdownShortcutPlugin} from '@lexical/react/LexicalMarkdownShortcutPlugin';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { TRANSFORMERS } from "@lexical/markdown";
import exampleTheme from '@/themes/ExampleTheme';
import { HeadingNode } from "@lexical/rich-text";
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";



function Placeholder() {
    return <div className="editor-placeholder">Enter some rich text...</div>;
  }


export default function EditorTest(){
    const editorConfig = {
        // The editor theme
        theme: exampleTheme,
        // Handling of errors during update
        onError(error) {
          throw error;
        },
        // Any custom nodes go here
        nodes: [
          HeadingNode,
        //   ListNode,
        //   ListItemNode,
        //   QuoteNode,
        //   CodeNode,
        //   CodeHighlightNode,
        //   TableNode,
        //   TableCellNode,
        //   TableRowNode,
        //   AutoLinkNode,
        //   LinkNode
        ]
      };
    return (
    <LexicalComposer initialConfig={editorConfig}>
        <RichTextPlugin
            contentEditable={<ContentEditable className="editor-input" />}
            placeholder={<Placeholder />}
            ErrorBoundary={LexicalErrorBoundary}
          />
        <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
    </LexicalComposer>
)}