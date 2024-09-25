'use client'

import Link from 'next/link';

export default function Navbar() {

  return (
    <nav className="bg-blue-600 fixed w-full top-0 z-10 shadow-md">
      <div className="flex items-center justify-between max-w-7xl mx-auto h-16">

        {/* Logo */}
        <div className="text-white text-2xl font-bold pl-2">
          <Link href="/">SPEED</Link>
        </div>

      </div>
    </nav>
  );
}
