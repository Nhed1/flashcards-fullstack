import { Button, Flex } from "@chakra-ui/react";
import "./style.css";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import React from "react";
import { BsTypeBold } from "react-icons/bs";

interface TextEditor {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  isBoldShowing?: boolean;
}

export const TextEditor = ({
  value,
  onChange = () => {},
  placeholder,
  isBoldShowing = true,
}: TextEditor) => {
  Placeholder.configure({
    emptyNodeClass: "my-custom-is-empty-class",
    placeholder: placeholder,
  });

  const editor = useEditor({
    onUpdate({ editor }) {
      const text = editor?.getHTML();

      onChange(text);
    },
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: placeholder,
      }),
    ],
  });

  const handleEditorClick = () => {
    if (editor) editor.commands.focus();
  };

  return (
    <>
      {editor && isBoldShowing && (
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
          value={value}
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
