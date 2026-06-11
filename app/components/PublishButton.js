export default function PublishButton({ onClick, disabled }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="text-black rounded-md bg-brand box-border bg-postForegroundColor hover:bg-buttonHoverColor hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none disabled:opacity-50"
    >
      Publish post
    </button>
  )
}
