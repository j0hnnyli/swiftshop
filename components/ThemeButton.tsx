'use client'

import HoverTip from "./HoverTip"
import { useTheme } from 'next-themes'
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid'


const ThemeButton = () => {
  const { theme, setTheme } = useTheme()

  return (
    <HoverTip
      tip={theme === 'dark' ? 'Light' : 'Dark'}
    >
      <div
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className='flex items-center justify-center '
      >
        {theme === 'dark' ? 
          <SunIcon className='w-5'/> : 
          <MoonIcon className='w-5'/>
        }
      </div>
    </HoverTip>
  )
}

export default ThemeButton