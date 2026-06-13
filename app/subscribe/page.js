'use client'

import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { subscribe } from '../apis/subscribe'

const statusMessages = {
  confirmed: "Your subscription is confirmed. You'll get an email whenever a new post is published!",
  unsubscribed: "You've been unsubscribed. Sorry to see you go!",
  invalid: 'That link is invalid or has expired.',
}

function SubscribeForm() {
  const status = useSearchParams().get('status')
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      await subscribe(email)
      setSent(true)
    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <div className="bg-postForegroundColor p-8 rounded-xl shadow-lg w-full max-w-sm">
        <h1 className="text-3xl font-bold text-white mb-6 text-center font-[Caveat]">Subscribe</h1>
        {statusMessages[status] && !sent && (
          <p className="text-white text-center mb-4">{statusMessages[status]}</p>
        )}
        {sent ? (
          <p className="text-white text-center">
            Almost there! Check your inbox and click the confirmation link to finish subscribing.
          </p>
        ) : (
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <p className="text-white text-center">
              Get an email whenever a new post is published.
            </p>
            <div className="flex flex-col gap-1">
              <label className="text-white font-medium">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-md px-3 py-2 bg-background text-gray-700 outline-none focus:ring-2 focus:ring-postBorderColor"
                placeholder="you@example.com"
                required
              />
            </div>
            {error && <p className="text-white text-sm text-center">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="mt-2 bg-postBorderColor hover:bg-buttonHoverColor text-white font-medium py-2 rounded-md transition-colors disabled:opacity-60"
            >
              {loading ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

export default function SubscribePage() {
  return (
    <Suspense>
      <SubscribeForm />
    </Suspense>
  )
}
