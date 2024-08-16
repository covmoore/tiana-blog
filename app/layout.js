import Navbar from "./components/Navbar"
import { Metadata } from "next"

import "./globals.css"

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <div>
          {children}
        </div>
      </body>
    </html>
  )
}