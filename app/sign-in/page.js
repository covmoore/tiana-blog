'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'

export default function SignInPage() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const response = await axios.post('http://localhost:8080/authorize', { username, password })
      localStorage.setItem('token', response.data.token)
      router.push('/')
    } catch (err) {
      setError('Invalid username or password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <div className="bg-postForegroundColor p-8 rounded-xl shadow-lg w-full max-w-sm">
        <h1 className="text-3xl font-bold text-white mb-6 text-center font-[Caveat]">Sign In</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1">
            <label className="text-white font-medium">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="rounded-md px-3 py-2 bg-background text-gray-700 outline-none focus:ring-2 focus:ring-postBorderColor"
              placeholder="Username"
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-white font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-md px-3 py-2 bg-background text-gray-700 outline-none focus:ring-2 focus:ring-postBorderColor"
              placeholder="••••••••"
              required
            />
          </div>
          {error && <p className="text-white text-sm text-center">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="mt-2 bg-postBorderColor hover:bg-buttonHoverColor text-white font-medium py-2 rounded-md transition-colors disabled:opacity-60"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}
