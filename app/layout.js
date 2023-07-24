import './globals.css'
import { Poppins } from "next/font/google"

import Sidebar from '@/components/Sidebar'
import Headbar from '@/components/Headbar'
import { ToastContextProvider } from '@/context/ToastContext'

export const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
})

export const metadata = {
  title: 'Dashboard | Fuji Nugraha',
  description: 'Built by Fuji Nugraha, for fullfill online test (Frontend Engineer)',
}

export default function RootLayout({ children }) {
  const host = process.env.HOST

  return (
    <html lang="en">
      <body className={poppins.className}>
        <div className="flex w-full min-h-screen h-auto bg-white sm:bg-gray-100 relative">
          <ToastContextProvider>
            <Sidebar />
            <div className="w-full">
              <Headbar host={host} />

              {/* main conent */}
              {children}
            </div>
          </ToastContextProvider>
        </div>
      </body>
    </html>
  )
}
