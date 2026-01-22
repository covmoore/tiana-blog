import CreateEditContent from "./CreateEditContent";
import CreatePreviewContent from "./CreatePreviewContent";

import { useState } from "react"

export default function PostCreateContent() {
    const handleEditPressed = () => {
        setPreviewContext(false)
    }

    const handlePreviewPressed = () => {
        setPreviewContext(true)
    }

    const [isPreviewContext, setPreviewContext] = useState(false);
    const [content, setContent] = useState("")

    return (
        <div>
            <div className="flex flex-wrap items-center space-x-1 rtl:space-x-reverse sm:ps-4">
                <button type="button" className="p-2 text-body rounded-sm cursor-pointer hover:text-heading hover:bg-neutral-tertiary-medium" id="edit" onClick={handleEditPressed}>
                    <h3>Edit</h3>
                </button>
                <button type="button" className="p-2 text-body rounded-sm cursor-pointer hover:text-heading hover:bg-neutral-tertiary-medium" id="preview" onClick={handlePreviewPressed}>
                    <h3>Preview</h3>
                </button>
            </div>
            {isPreviewContext ? <CreatePreviewContent {...{ content }} /> : <CreateEditContent {...{ content, setContent }} />}
        </div>
    )
}