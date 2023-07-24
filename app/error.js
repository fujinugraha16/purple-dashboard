'use client'

import { useEffect } from 'react'

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="p-0 sm:p-4">
      <div className="flex flex-col gap-5 w-full px-4 py-6 bg-white rounded-lg text-gray-700 shadow-none sm:shadow-sm">
        <div className="flex flex-col gap-4 items-center">
          <h2 className="text-primary text-[28px]` sm:text-[32px] text-center text-gray-700">Something Went Wrong</h2>
          <button
            className="flex justify-center items-center px-3 gap-1 border border-purple-500 hover:bg-purple-500 rounded-lg w-[250px] h-10 text-sm text-purple-500 hover:text-white font-medium"
            onClick={reset}
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  )
}