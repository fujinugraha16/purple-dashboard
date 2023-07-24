"use client"

export default function NotFoundPage() {
  return (
    <div className="flex justify-center items-center w-[100vw] h-[100vh] bg-white">
      <div className="flex flex-col gap-4 items-center">
        <h2 className="text-primary text-[28px] sm:text-[32px] text-center text-gray-700">404 | Page not found</h2>
        <button
          className="flex justify-center items-center px-3 gap-1 border border-purple-500 hover:bg-purple-500 rounded-lg w-[250px] h-10 text-sm text-purple-500 hover:text-white font-medium"
          onClick={() => window.open('/', "_self")}
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  )
}