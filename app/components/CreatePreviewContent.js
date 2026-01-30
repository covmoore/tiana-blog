import ReactMarkdown from "react-markdown"

export default function CreatePreviewContent(props) {
    return (
        <div className="prose lg:prose-xl">
            <ReactMarkdown>{props.content}</ReactMarkdown>
        </div>
    )
}