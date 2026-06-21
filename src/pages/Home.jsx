import React, { useState } from 'react'
import {Navbar} from '../components'
import useDarkMode from '../Hooks/useDarkMode'

function Home() {
  return (
    <div className='w-full h-[200vw]'>
        <div className='h-14 z-50 w-full sticky top-0 flex items-center bg-white dark:border-b-gray-700 dark:bg-slate-800/95 border-b border-b-gray-200'>
          <div className='w-full'>
            <Navbar />
          </div>
        </div>
        <div className="max-w-5xl mx-auto text-white text-xl px-6"></div>
    </div>
  )
}

export default Home