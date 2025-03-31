'use client'
import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { useSession, signIn, signOut } from "next-auth/react"

const Navbar = () => {
  const { data: session } = useSession()

  return (
    <nav className='bg-[#9e0059] text-white md:p-5 p-2.5 w-full'>
      <div className='flex justify-between items-center'>
        {/* Logo */}
        <Link href="/" className='cursor-pointer'>
          <div className='flex items-center gap-1'>
            <Image src="/logo1.png" alt="logo" width={52} height={52} className='md:w-[4.8rem] border-2 border-white rounded-full' />
            <div className='bg-gradient-to-r from-[#f8eaff] to-[#fce5e1] text-transparent bg-clip-text inline-block'>
              <h1 className="md:text-3xl text-xl font-bold">RecipeNest</h1>
              <h5 className='font-semibold text-xs md:text-base'>Where Flavors Find a Home!</h5>
            </div>
          </div>
        </Link>

        {/* If user is logged in */}
        {session ? (
          <div className='flex md:gap-5 gap-0.5 items-center'>
            <Link href="/dashboard">
              <button className='bg-[#ff03929c] md:p-1.5 p-0.5 md:rounded-xl rounded md:text-lg text-xs border-1 hover:text-yellow-300 md:px-5 px-1 md:mx-3 mx-1'>Dashboard</button>
            </Link>

            {/* Logout Button */}
            <button className='bg-[#ff03929c] md:p-1.5 p-0.5 md:rounded-xl rounded md:text-lg text-xs border-1 hover:text-yellow-300 md:px-5 px-1' onClick={() => signOut()}>Logout</button>
            
            {/* User Profile Icon */}
            <Link href={`/${session.user.username}`}>
              <Image
                src={session.user.image}
                alt="User Profile"
                width={50}
                height={50}
                className='size-8 rounded-full cursor-pointer border-2 border-white md:h-14 md:w-14 '
              />
            </Link>
          </div>
        ) : (
          // If user is not logged in
          <div>
            <Link href="/dashboard">
              <button className='bg-[#ff03929c] md:p-1.5 p-0.5 md:rounded-xl rounded md:text-lg text-sm border-1 hover:text-yellow-300 md:px-5 px-2 md:mx-3 mx-1'>Dashboard</button>
            </Link>
            <Link href="/login">
              <button className='bg-[#ff03929c] md:p-1.5 p-0.5 md:rounded-xl rounded md:text-lg text-sm border-1 hover:text-yellow-300 md:px-5 px-2  md:mx-3 mx-1'>LogIn</button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
