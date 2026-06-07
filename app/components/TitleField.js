export default function TitleField({ value, onChange }) {
  return (
    <div className="px-4 py-2 bg-neutral-secondary-medium rounded-b-base">
      <label htmlFor="title" className="px-2">Title</label>
      <input
        id="title"
        className="block w-full py-2 px-4 text-sm text-heading bg-neutral-secondary-medium border-0 focus:ring-0 placeholder:text-body"
        placeholder="Title name..."
        required
        value={value}
        onChange={onChange}
      />
    </div>
  )
}
