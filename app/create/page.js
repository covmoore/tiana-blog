'use client'
import '../globals.css'
import { Suspense } from 'react'
import PostCreateContent from '../components/PostCreateContent'
import { useAuth } from '../hooks/useAuth'

export default function Create() {
    const { isAuthenticated, loading } = useAuth()

    if (loading) return null

    if (!isAuthenticated) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p className="text-2xl font-medium text-gray-700">Not Authorized to view this page.</p>
            </div>
        )
    }

    return (
        <div>
            <div className="flex flex-row text-5xl justify-center pb-6">
                <h1>Create New Post</h1>
            </div>
            <div className='pt-6'>
                <Suspense fallback={null}>
                    <PostCreateContent />
                </Suspense>
            </div>
        </div>
    )
}