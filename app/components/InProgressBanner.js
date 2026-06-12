'use client'

import { useRouter } from 'next/navigation'
import { clearDraftCache } from '../apis/draftCache'

export default function InProgressBanner({ onDismiss }) {
  const router = useRouter()

  const handleContinue = () => {
    router.push('/create?resume=true')
  }

  const handleDiscard = () => {
    clearDraftCache()
    onDismiss()
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 w-full max-w-screen-xl mx-6 mt-6 px-4 py-3 rounded-md bg-progressBannerPink text-white shadow-md">
      <span className="font-medium">Blog post still in progress, would you like to keep working on it?</span>
      <div className="flex gap-2 shrink-0">
        <button
          type="button"
          onClick={handleContinue}
          className="text-progressBannerPink rounded-md bg-white hover:bg-background shadow-xs font-medium leading-5 text-sm px-4 py-2 focus:outline-none"
        >
          Continue
        </button>
        <button
          type="button"
          onClick={handleDiscard}
          className="text-white rounded-md border border-white hover:bg-progressBannerPinkHover shadow-xs font-medium leading-5 text-sm px-4 py-2 focus:outline-none"
        >
          Discard
        </button>
      </div>
    </div>
  )
}
