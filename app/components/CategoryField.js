import CreatableSelect from './CreatableSelect.jsx';

export default function CategoryField({ categories, category, setCategory }) {
  return (
    <div className="px-4">
      <label className="px-2">Category</label>
      <CreatableSelect
        className="px-2 max-w-28 rounded-sm"
        initialCategories={categories}
        value={category}
        setCategory={setCategory}
      />
    </div>
  )
}
