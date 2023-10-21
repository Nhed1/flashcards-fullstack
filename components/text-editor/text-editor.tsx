import { Button, Flex } from "@chakra-ui/react";
import "./style.css";

import { Editor, EditorContent, Node, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import React, { useEffect, useState } from "react";
import { BsTypeBold } from "react-icons/bs";
import { getBoldTextHtml } from "@/app/utils/getBoldTextHtml";

interface TextEditor {
  dependencyValue?: string;
  key?: number;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  isBoldShowing?: boolean;
  setBoldTexts?: (value: string[]) => void;
}

export const TextEditor = ({
  key,
  dependencyValue,
  value,
  onChange = () => {},
  placeholder,
  isBoldShowing = true,
  setBoldTexts,
}: TextEditor) => {
  const editor = useEditor(
    {
      content: value,
      onUpdate({ editor }) {
        const html = editor.getHTML();

        onChange(html);

        if (setBoldTexts) {
          const boldTexts = getBoldTextHtml(editor.getHTML());

          setBoldTexts(boldTexts);
        }
      },
      extensions: [
        StarterKit,
        Placeholder.configure({
          placeholder: placeholder,
        }),
      ],
    },
    [dependencyValue]
  );

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
          key={key}
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
