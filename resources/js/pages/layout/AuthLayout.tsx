import React from "react"
import Navbar from "./Navbar"
import { Footer } from "./Footer"
import { usePage } from "@inertiajs/react"
import { type SharedData } from "@/types"

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const { auth } = usePage<SharedData>().props; // Get auth data

  return (
    <div className="relative">
      <Navbar auth={auth} /> {/* Pass auth as a prop */}
      {children}

      
      <Footer />
    </div>
  )
}

export default AuthLayout
