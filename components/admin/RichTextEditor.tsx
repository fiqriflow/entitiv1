"use client";

import { useEffect, useRef } from "react";
import { Bold, Italic, Underline, List, ListOrdered } from "lucide-react";

export default function RichTextEditor({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
}) {
  const editorRef = useRef<HTMLDivElement>(null);
  const hasInitialized = useRef(false);

  // Isi konten awal cuma sekali (mode edit) - biar cursor nggak kereset
  // tiap kali user ngetik.
  useEffect(() => {
    if (editorRef.current && !hasInitialized.current) {
      editorRef.current.innerHTML = value || "";
      hasInitialized.current = true;
    }
  }, [value]);

  function handleInput() {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  }

  function exec(command: string) {
    document.execCommand(command, false);
    handleInput();
  }

  return (
    <div className="overflow-hidden rounded-lg border border-black/10">
      <div className="flex items-center gap-1 border-b border-black/10 bg-court px-2 py-1.5">
        <ToolbarButton label="Tebal" onClick={() => exec("bold")}>
          <Bold size={15} />
        </ToolbarButton>
        <ToolbarButton label="Miring" onClick={() => exec("italic")}>
          <Italic size={15} />
        </ToolbarButton>
        <ToolbarButton label="Garis bawah" onClick={() => exec("underline")}>
          <Underline size={15} />
        </ToolbarButton>
        <span className="mx-1 h-4 w-px bg-black/10" />
        <ToolbarButton
          label="Bullet list"
          onClick={() => exec("insertUnorderedList")}
        >
          <List size={15} />
        </ToolbarButton>
        <ToolbarButton
          label="Numbered list"
          onClick={() => exec("insertOrderedList")}
        >
          <ListOrdered size={15} />
        </ToolbarButton>
      </div>

      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        data-placeholder={placeholder}
        className="rich-content min-h-[140px] px-3.5 py-2.5 text-sm focus:outline-none"
      />
    </div>
  );
}

function ToolbarButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      // mousedown di-preventDefault supaya selection teks nggak hilang
      // sebelum command dijalankan
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      className="focus-ring rounded p-1.5 text-ink-soft transition-colors hover:bg-black/5 hover:text-ink"
    >
      {children}
    </button>
  );
}
