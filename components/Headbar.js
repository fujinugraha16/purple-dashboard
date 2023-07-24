'use client'
import { useState } from 'react'
import { useSelectedLayoutSegment } from 'next/navigation'
import Image from 'next/image'

import MenuDrawer from './MenuDrawer'
import LogoutToolTip from './LogoutToolTip'

// icons
import BurgerIcon from '@/icons/burger-icon'

const Headbar = ({ host }) => {
  const [showMenuDrawer, setShowMenuDrawer] = useState()
  const [showLogoutTooltip, setShowLogoutTooltip] = useState(false)

  const segment = useSelectedLayoutSegment()

  const handleToggleMenuDrawer = () => setShowMenuDrawer(prevState => !prevState)

  return (
    <>
      <div
        className={["not-found", "__DEFAULT__", "login"].includes(segment) ? "hidden" : "flex justify-between lg:justify-end items-center px-4 w-full bg-white border-b-[1px] border-b-gray-100 sticky top-0 shadow-sm"}
        style={{ height: '64px !important' }}
      >
        <button className="text-gray-700 block lg:hidden" onClick={handleToggleMenuDrawer}>
          <BurgerIcon className="w-6 h-6" />
        </button>

        <div className="flex items-center gap-3 relative">
          <p className="text-sm text-gray-700">Fuji Nugraha</p>
          <div 
            className="w-9 h-9 cursor-pointer rounded-full border border-purple-300 bg-purple-50 overflow-hidden"
            onClick={() => setShowLogoutTooltip(true)}
          >
            <Image
              src="https://robohash.org/fujinugraha"
              alt="Avatar"
              width={300}
              height={300}
              className="object-cover"
            />
          </div>

          <div className="absolute -bottom-20 z-50">
            <LogoutToolTip
              open={showLogoutTooltip}
              toggle={() => setShowLogoutTooltip(prevState => !prevState)}
              host={host}
            />
          </div>
        </div>
      </div>

      <MenuDrawer open={showMenuDrawer} toggle={handleToggleMenuDrawer} />
    </>
  )
}

export default Headbar