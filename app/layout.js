'use client'
import Navbar from "./components/Navbar"
import "./globals.css"

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <div className="mx-auto bg-red-100 px-4 py-8">
          {children}
        </div>
      </body>
    </html>
  )
}