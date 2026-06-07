export default function EditorField({ value, onChange }) {
  return (
    <div className="px-4 py-2 bg-neutral-secondary-medium rounded-b-base">
      <label htmlFor="editor" className="px-2">Contents</label>
      <textarea
        id="editor"
        rows="8"
        className="block w-full py-2 px-4 text-sm text-heading bg-neutral-secondary-medium border-0 focus:ring-0 placeholder:text-body"
        placeholder="Create your post..."
        required
        value={value}
        onChange={onChange}
      />
    </div>
  )
}
