'use client'
import '../globals.css'
import PostCreateContent from '../components/PostCreateContent'

export default function Create() {
    return (
        <div>
            <div className="flex flex-row text-5xl justify-center pb-6">
                <h1>Create New Post</h1>
            </div>
            <div class='pt-6'>
                <PostCreateContent />
            </div>
        </div>
    )
}