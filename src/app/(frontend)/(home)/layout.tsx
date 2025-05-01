import React from 'react'
import NavBar from './nav-bar'
import Footer from './footer'

export default async function HomeLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="flex-1 bg-[#F4F4F0]">{children}</div>
      <Footer />
    </div>
  )
}
