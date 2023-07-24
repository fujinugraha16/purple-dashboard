"use client"

import { useContext } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"

// icons
import LogoutIcon from "@/icons/logout-icon"

// context
import ToastContext from "@/context/ToastContext"

const LogoutToolTip = ({ open, toggle, host }) => {
  const router = useRouter()
  const addToast = useContext(ToastContext)

  const handleLogout = async () => {
    try {
      await axios(`${host}/api/logout`)
      router.push('/login')
      toggle()
    } catch(err) {
      addToast({
        type: "failed",
        message: "Logout failed",
      })
    }
  }

  return (
    <div className="relative">
      <div className={`${open ? 'block' : 'hidden'} bg-white p-4 shadow-lg rounded-lg relative z-10`}>
        <button
          className="flex justify-center items-center px-3 gap-1 border border-red-500 hover:bg-red-500 rounded-lg w-full sm:w-auto h-8 text-sm text-red-500 hover:text-white font-medium"
          onClick={handleLogout}
        >
          Logout
          <LogoutIcon className="w-5 h-5" />
        </button>
      </div>

      <div className={`${open ? 'block' : 'hidden'} fixed inset-0`} onClick={toggle} />
    </div>
  )
}

export default LogoutToolTip