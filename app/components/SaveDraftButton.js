export default function SaveDraftButton({ onClick, disabled }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="text-gray-800 rounded-md bg-white border border-default-medium hover:bg-gray-100 shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none disabled:opacity-50"
    >
      Save as draft
    </button>
  )
}
