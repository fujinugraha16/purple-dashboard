"use client"

import CloseIcon from "@/icons/close-icon"
import { useCallback, useEffect, useState, createContext } from "react"

const ToastContext = createContext()

const Toast = ({ type, message, onClick, ...props }) => {
  let style = ""
  let title = ""

  switch (type) {
    case "success":
      title = "Success!"
      style = "border-green-400 bg-green-50 text-green-700"
      break
    case "failed":
      title = "Failed!"
      style = "border-red-400 bg-red-50 text-red-700"
      break
    default:
      style = "border-gray-400 bg-gray-50 text-gray-700"
      break
  }

  return (
    <div
      {...props}
      className={`flex justify-between w-[90%] sm:min-w-[300px] sm:w-auto shadow-md rounded-lg py-3 pl-4 pr-3 text-sm border ${style}`}
    >
      <div className="flex flex-col">
        {title && (
          <h4 className="text-lg font-semibold">{title}</h4>
        )}
        <p className="text-sm">{message}</p>
      </div>
      <button onClick={onClick}>
        <CloseIcon className="w-5 h-5" />
      </button>
    </div>
  )
}

export const ToastContextProvider = ({ children }) => {
  const [toasts, setToasts] = useState([])

  const addToast = useCallback((toast) => {
    setToasts(prevState => [...prevState, toast])
  }, [setToasts])

  const removeToast = useCallback((index) => {
    setToasts(prevState => prevState.filter((_, idx) => idx !== index))
  }, [setToasts])

  useEffect(() => {
    if (toasts.length > 0) {
      const timer = setTimeout(() => setToasts(prevState => prevState.slice(1)), 5000)

      return () => clearTimeout(timer)
    }
  }, [toasts])
  
  return (
    <ToastContext.Provider value={addToast}>
      {children}

      <div className="absolute top-4 right-4 flex flex-col items-end gap-3 z-50 w-full">
        {toasts.map(({ type, message }, index) => (
          <Toast
            key={index}
            type={type}
            message={message}
            onClick={() => removeToast(index)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export default ToastContext