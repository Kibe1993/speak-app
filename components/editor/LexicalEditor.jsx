"use client";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";

import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { TOGGLE_LINK_COMMAND, LinkNode } from "@lexical/link";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

import styles from "./editor.module.css";

function LinkButton() {
  const [editor] = useLexicalComposerContext();

  const handleAddLink = () => {
    const url = prompt("Enter URL for selected text:");
    if (url) {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, url);
    }
  };

  return (
    <button type="button" className={styles.linkButton} onClick={handleAddLink}>
      🔗 Add Link
    </button>
  );
}

export default function LexicalEditor({ onChange }) {
  const initialConfig = {
    namespace: "BlogEditor",
    theme: {},
    onError(error) {
      console.error("Lexical error:", error);
    },
    nodes: [LinkNode], // ✅ Register LinkNode
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className={styles.toolbar}>
        <LinkButton />
      </div>

      <div className={styles.editorWrapper}>
        <RichTextPlugin
          contentEditable={<ContentEditable className={styles.editorInput} />}
          placeholder={
            <div className={styles.editorPlaceholder}>Write your blog...</div>
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
        <OnChangePlugin
          onChange={(editorState) => {
            editorState.read(() => {
              const html = document.querySelector(
                `.${styles.editorInput}`
              )?.innerHTML;
              onChange(html || "");
            });
          }}
        />
        <LinkPlugin />
      </div>
    </LexicalComposer>
  );
}
