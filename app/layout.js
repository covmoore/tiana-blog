'use client'
import Navbar from "./components/Navbar"
import "./globals.css"

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="bg-background">
          <Navbar key="nav" />
          <div className="font-[nunito] mx-auto px-4 py-8">
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}