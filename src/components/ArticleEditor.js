'use client';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import { T } from '@/components/ui';

function ToolBtn({ onClick, active, title, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      style={{
        padding: "5px 10px",
        background: active ? "rgba(201,169,97,0.2)" : "transparent",
        border: active ? `1px solid ${T.goldBorder}` : "1px solid transparent",
        color: active ? T.gold : T.muted,
        fontFamily: T.sans,
        fontSize: 13,
        cursor: "pointer",
        borderRadius: 2,
        transition: "all 0.15s",
        minWidth: 32,
      }}
    >
      {children}
    </button>
  );
}

export default function ArticleEditor({ value, onChange }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: false }),
    ],
    content: value || '',
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        style: [
          `min-height: 280px`,
          `outline: none`,
          `color: rgba(245,241,232,0.85)`,
          `font-family: Lato, sans-serif`,
          `font-size: 14px`,
          `font-weight: 300`,
          `line-height: 1.75`,
          `padding: 16px`,
        ].join(';'),
      },
    },
  });

  if (!editor) return null;

  const addLink = () => {
    const url = window.prompt('URL:');
    if (url) editor.chain().focus().setLink({ href: url }).run();
  };

  return (
    <div>
      <style>{`
        .tiptap-editor h1 { font-family: 'Cormorant Garamond', serif; font-size: 26px; font-weight: 400; color: #F5F1E8; margin: 1.2em 0 0.4em; }
        .tiptap-editor h2 { font-family: 'Cormorant Garamond', serif; font-size: 21px; font-weight: 400; color: #F5F1E8; margin: 1.2em 0 0.4em; }
        .tiptap-editor h3 { font-family: 'Cormorant Garamond', serif; font-size: 17px; font-weight: 400; color: #F5F1E8; margin: 1em 0 0.3em; }
        .tiptap-editor p { margin: 0 0 0.8em; }
        .tiptap-editor strong { font-weight: 700; color: #F5F1E8; }
        .tiptap-editor em { font-style: italic; }
        .tiptap-editor a { color: #C9A961; }
        .tiptap-editor ul, .tiptap-editor ol { padding-left: 1.4em; margin-bottom: 0.8em; }
        .tiptap-editor li { margin-bottom: 0.25em; }
        .tiptap-editor blockquote { border-left: 2px solid #C9A961; margin: 1.5em 0; padding: 0.3em 0 0.3em 1.2em; font-family: 'Cormorant Garamond', serif; font-size: 18px; font-style: italic; color: rgba(245,241,232,0.65); }
        .tiptap-editor hr { border: none; border-top: 1px solid rgba(201,169,97,0.2); margin: 2em 0; }
        .tiptap-editor p.is-editor-empty:first-child::before { content: attr(data-placeholder); color: #444; pointer-events: none; float: left; height: 0; }
      `}</style>

      {/* Toolbar */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 4, padding: "8px 12px", background: "#0a0a0a", border: `1px solid ${T.border}`, borderBottom: "none" }}>
        <ToolBtn onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive('bold')} title="Pogrubienie"><strong>B</strong></ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive('italic')} title="Kursywa"><em>I</em></ToolBtn>
        <div style={{ width: 1, background: T.border, margin: "0 4px" }} />
        <ToolBtn onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} active={editor.isActive('heading', { level: 1 })} title="Nagłówek H1">H1</ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive('heading', { level: 2 })} title="Nagłówek H2">H2</ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive('heading', { level: 3 })} title="Nagłówek H3">H3</ToolBtn>
        <div style={{ width: 1, background: T.border, margin: "0 4px" }} />
        <ToolBtn onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive('bulletList')} title="Lista punktowana">≡</ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive('orderedList')} title="Lista numerowana">1.</ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive('blockquote')} title='Cytat'>"</ToolBtn>
        <div style={{ width: 1, background: T.border, margin: "0 4px" }} />
        <ToolBtn onClick={addLink} active={editor.isActive('link')} title="Link">🔗</ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().setHorizontalRule().run()} title="Linia pozioma">—</ToolBtn>
        <div style={{ flex: 1 }} />
        <ToolBtn onClick={() => editor.chain().focus().undo().run()} title="Cofnij">↩</ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().redo().run()} title="Ponów">↪</ToolBtn>
      </div>

      {/* Editor area */}
      <div
        className="tiptap-editor"
        style={{ background: "#111", border: `1px solid ${T.border}`, cursor: "text" }}
        onClick={() => editor.commands.focus()}
      >
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
