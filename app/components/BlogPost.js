import Markdown from "react-markdown"
import remarkGfm from 'remark-gfm' 

export default function BlogPost(props) {
    const blog = props.blog
    //console.log("BREH", blog.body)
    return (
        <div className="border-solid  mb-32">
            <div className="my-2">
                <div className="flex flex-row justify-between my-6">
                    <text className="font-medium">Author: {blog.author}</text>
                    <text className="font-medium">Date: {blog.dateCreated}</text>
                </div>
                <div className="flex justify-center my-6">
                    <text className="text-4xl font-medium underline">{blog.title}</text>
                </div>
                <div className="my-6">
                    <div className="prose lg:prose-xl prose-code:before:hidden prose-code:after:hidden ">
                        <Markdown>{blog.body}</Markdown>
                    </div>
                </div>
            </div>
        </div>
    )
}