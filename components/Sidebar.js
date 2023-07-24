'use client'
import { usePathname, useRouter, useSelectedLayoutSegment } from 'next/navigation'

import menus from "@/utils/menus"

const Sidebar = () => {
  const pathname = usePathname()
  const router = useRouter()
  const segment = useSelectedLayoutSegment()

  return (
    <div className={["not-found", "__DEFAULT__", "login"].includes(segment) ? "hidden" : "hidden lg:flex flex-col gap-3 w-2/5 lg:w-1/5 min-h-screen h-auto bg-white py-5 px-3 border-r-[1px] border-r-gray-100"}>
      <div className="px-3">
        <h1 className="text-gray-700 text-xl font-semibold">Dashboard</h1>
      </div>
  
      <div className="flex flex-col gap-1">
        {menus.map(({ title, icon, url }, index) => (
          <div
            key={index}
            className={`flex items-center gap-2 ${pathname === url ? 'text-purple-500' : 'text-gray-700'} ${pathname === url ? 'font-semibold' : 'font-normal'} hover:text-white hover:font-normal hover:bg-purple-500 h-10 rounded-lg px-4 cursor-pointer`}
            onClick={() => router.push(url)}
          >
            <div className="w-6 h-6">{icon}</div>
            <p>{title}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Sidebar