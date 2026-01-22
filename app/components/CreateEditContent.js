export default function CreateEditContent(props) {
    const handleChange = (event) => {
        props.setContent(event.target.value);
    }

    return (
        <form>
            <div className="w-full mb-4 border border-default-medium rounded-base bg-neutral-secondary-medium shadow-xs">
                <div className="flex items-center justify-between px-3 py-2 border-b border-default-medium">
                    <div className="flex flex-wrap items-center divide-default-medium sm:divide-x sm:rtl:divide-x-reverse">
                        <div className="flex items-center space-x-1 rtl:space-x-reverse sm:pe-4">
                            <button type="button" className="p-2 text-body rounded-sm cursor-pointer hover:text-heading hover:bg-neutral-tertiary-medium">
                                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M16 18H8l2.5-6 2 4 1.5-2 2 4Zm-1-8.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z" /><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 3v4a1 1 0 0 1-1 1H5m14-4v16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7.914a1 1 0 0 1 .293-.707l3.914-3.914A1 1 0 0 1 9.914 3H18a1 1 0 0 1 1 1ZM8 18h8l-2-4-1.5 2-2-4L8 18Zm7-8.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z" /></svg>
                                <span className="sr-only">Upload image</span>
                            </button>
                            <button type="button" className="p-2 text-body rounded-sm cursor-pointer hover:text-heading hover:bg-neutral-tertiary-medium">
                                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 9h.01M8.99 9H9m12 3a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM6.6 13a5.5 5.5 0 0 0 10.81 0H6.6Z" /></svg>
                                <span className="sr-only">Add emoji</span>
                            </button>
                        </div>
                    </div>
                    <button type="button" data-tooltip-target="tooltip-fullscreen" className="p-2 text-body rounded-sm cursor-pointer sm:ms-auto hover:text-heading hover:bg-neutral-tertiary-medium">
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 4H4m0 0v4m0-4 5 5m7-5h4m0 0v4m0-4-5 5M8 20H4m0 0v-4m0 4 5-5m7 5h4m0 0v-4m0 4-5-5" /></svg>
                        <span className="sr-only">Full screen</span>
                    </button>
                    <div id="tooltip-fullscreen" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-dark rounded-base shadow-xs opacity-0 tooltip">
                        Show full screen
                        <div className="tooltip-arrow" data-popper-arrow></div>
                    </div>
                </div>
                <div className="px-4 py-2 bg-neutral-secondary-medium rounded-b-base">
                    <label for="editor" className="sr-only">Publish post</label>
                    <textarea id="editor" rows="8" className="block w-full py-2 px-4 text-sm text-heading bg-neutral-secondary-medium border-0 focus:ring-0 placeholder:text-body" placeholder="Create your post..." required value={props.content} onChange={handleChange}></textarea>
                </div>
            </div>
            <button type="submit" className="text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">Publish post</button>
        </form>
    )
}