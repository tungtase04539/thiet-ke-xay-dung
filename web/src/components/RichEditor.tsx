'use client'

import { useEffect, useCallback, useRef } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import ImageExtension from '@tiptap/extension-image'
import LinkExtension from '@tiptap/extension-link'
import PlaceholderExtension from '@tiptap/extension-placeholder'
import UnderlineExtension from '@tiptap/extension-underline'
import TextAlignExtension from '@tiptap/extension-text-align'
import { uploadImageFile } from '@/lib/client-image-upload'
import {
  Bold, Italic, Underline, Link, Image as ImageIcon,
  Heading1, Heading2, Heading3, List, ListOrdered,
  AlignLeft, AlignCenter, AlignRight, Minus, Undo, Redo,
  Loader2,
} from 'lucide-react'
import { useState } from 'react'

interface Props {
  value: string
  onChange: (html: string) => void
  placeholder?: string
}

export default function RichEditor({ value, onChange, placeholder = 'Viết nội dung bài viết...' }: Props) {
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [1, 2, 3] } }),
      UnderlineExtension,
      ImageExtension.configure({ allowBase64: false, inline: false }),
      LinkExtension.configure({ openOnClick: false, HTMLAttributes: { class: 'text-gold underline' } }),
      PlaceholderExtension.configure({ placeholder }),
      TextAlignExtension.configure({ types: ['heading', 'paragraph'] }),
    ],
    content: value,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      handlePaste: (view, event) => {
        const items = Array.from(event.clipboardData?.items ?? [])
        const imageItem = items.find(i => i.type.startsWith('image/'))
        if (!imageItem) return false
        event.preventDefault()
        const file = imageItem.getAsFile()
        if (!file) return false
        setUploading(true)
        uploadImageFile(file, 'anphuoc/posts/content')
          .then(url => {
            view.dispatch(view.state.tr.replaceSelectionWith(
              view.state.schema.nodes.image.create({ src: url, alt: file.name })
            ))
          })
          .catch(console.error)
          .finally(() => setUploading(false))
        return true
      },
    },
  })

  // Sync value from outside (e.g. when editing an existing post)
  useEffect(() => {
    if (!editor) return
    if (editor.getHTML() !== value) {
      editor.commands.setContent(value, { emitUpdate: false })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value === '' ? value : null, editor])

  const uploadImage = useCallback(async (file: File) => {
    if (!editor) return
    setUploading(true)
    try {
      const url = await uploadImageFile(file, 'anphuoc/posts/content')
      editor.chain().focus().setImage({ src: url, alt: file.name.replace(/\.[^.]+$/, '') }).run()
    } catch (e) {
      console.error(e)
    } finally {
      setUploading(false)
    }
  }, [editor])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) uploadImage(file)
    e.target.value = ''
  }

  const setLink = () => {
    if (!editor) return
    const prev = editor.getAttributes('link').href
    const url = window.prompt('Nhập URL:', prev || 'https://')?.trim()
    if (url === null) return
    if (!url) { editor.chain().focus().unsetLink().run(); return }
    editor.chain().focus().setLink({ href: url }).run()
  }

  if (!editor) return null

  const btn = (active: boolean) =>
    `p-1.5 rounded transition-colors ${active ? 'bg-gold/20 text-gold' : 'text-text-muted hover:text-text hover:bg-border/50'}`

  return (
    <div className="border border-border rounded-sm overflow-hidden bg-bg focus-within:border-gold transition-colors">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 px-2 py-1.5 border-b border-border bg-surface">
        {/* History */}
        <button type="button" onClick={() => editor.chain().focus().undo().run()} className={btn(false)} title="Undo"><Undo size={14} /></button>
        <button type="button" onClick={() => editor.chain().focus().redo().run()} className={btn(false)} title="Redo"><Redo size={14} /></button>
        <span className="w-px h-4 bg-border mx-1" />

        {/* Headings */}
        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={btn(editor.isActive('heading', { level: 1 }))} title="Heading 1"><Heading1 size={14} /></button>
        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={btn(editor.isActive('heading', { level: 2 }))} title="Heading 2"><Heading2 size={14} /></button>
        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={btn(editor.isActive('heading', { level: 3 }))} title="Heading 3"><Heading3 size={14} /></button>
        <span className="w-px h-4 bg-border mx-1" />

        {/* Formatting */}
        <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={btn(editor.isActive('bold'))} title="Bold"><Bold size={14} /></button>
        <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={btn(editor.isActive('italic'))} title="Italic"><Italic size={14} /></button>
        <button type="button" onClick={() => editor.chain().focus().toggleUnderline().run()} className={btn(editor.isActive('underline'))} title="Underline"><Underline size={14} /></button>
        <span className="w-px h-4 bg-border mx-1" />

        {/* Alignment */}
        <button type="button" onClick={() => editor.chain().focus().setTextAlign('left').run()} className={btn(editor.isActive({ textAlign: 'left' }))} title="Align left"><AlignLeft size={14} /></button>
        <button type="button" onClick={() => editor.chain().focus().setTextAlign('center').run()} className={btn(editor.isActive({ textAlign: 'center' }))} title="Align center"><AlignCenter size={14} /></button>
        <button type="button" onClick={() => editor.chain().focus().setTextAlign('right').run()} className={btn(editor.isActive({ textAlign: 'right' }))} title="Align right"><AlignRight size={14} /></button>
        <span className="w-px h-4 bg-border mx-1" />

        {/* Lists */}
        <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className={btn(editor.isActive('bulletList'))} title="Bullet list"><List size={14} /></button>
        <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={btn(editor.isActive('orderedList'))} title="Ordered list"><ListOrdered size={14} /></button>
        <button type="button" onClick={() => editor.chain().focus().setHorizontalRule().run()} className={btn(false)} title="Divider"><Minus size={14} /></button>
        <span className="w-px h-4 bg-border mx-1" />

        {/* Link & Image */}
        <button type="button" onClick={setLink} className={btn(editor.isActive('link'))} title="Link"><Link size={14} /></button>
        <button type="button" onClick={() => fileInputRef.current?.click()} disabled={uploading} className={`${btn(false)} disabled:opacity-50`} title="Chèn ảnh">
          {uploading ? <Loader2 size={14} className="animate-spin" /> : <ImageIcon size={14} />}
        </button>
        <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />

        {uploading && <span className="text-[10px] text-gold tracking-wider ml-1">Đang tải ảnh...</span>}
      </div>

      {/* Editor content */}
      <EditorContent
        editor={editor}
        className="rich-editor min-h-[320px] px-5 py-4 text-text text-[15px] leading-relaxed focus:outline-none"
      />
    </div>
  )
}
