import { Button, Container, Flex, Icon } from "@chakra-ui/react";
import "./style.css";

import {
  BubbleMenu,
  EditorContent,
  FloatingMenu,
  useEditor,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { useRef } from "react";
import { BsTypeBold } from "react-icons/bs";

export const TextEditor = () => {
  const editor = useEditor({
    extensions: [StarterKit],
  });

  const handleEditorClick = () => {
    if (editor) editor.commands.focus();
  };

  return (
    <>
      {editor && (
        <Flex>
          <Button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive("bold") ? "is-active" : ""}
          >
            <BsTypeBold size="18px" />
          </Button>
        </Flex>
      )}

      <div onClick={handleEditorClick} style={{ cursor: "text" }}>
        <EditorContent
          editor={editor}
          style={{
            padding: "8px",
            minHeight: "120px",
            overflowY: "auto",
            border: "1px solid #CBD5E0",
            borderRadius: "4px",
          }}
        />
      </div>
    </>
  );
};
