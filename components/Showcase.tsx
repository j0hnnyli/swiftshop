'use client'

import { useState } from 'react'
import showcaseSlides from '@/lib/content/showcaseSlides'
import Image from 'next/image'
import {ChevronLeftIcon, ChevronRightIcon} from '@heroicons/react/24/outline'
import Link from 'next/link'
import { motion } from 'framer-motion'

const Showcase = () => {
  const [index, setIndex] = useState<number>(0)

  const slide = showcaseSlides[index];

  const handlePrev = () => {
    setIndex(index === 0 ? showcaseSlides.length - 1 : index - 1)
  }

  const handleNext = () => {
    setIndex(index === showcaseSlides.length - 1 ? 0 : index + 1);
  }

  return (
    <div className='h-[80vh] relative'>
      <Image 
        src={slide.img}
        alt={slide.title}
        width={500}
        height={300}
        className='w-full h-full bg-cover bg-center object-cover object-center absolute ease-in-out duration-200'
      />

      <div className='absolute bg-black opacity-50 w-full h-full'></div>

      <div className='absolute flex items-center justify-center w-full px-5 bottom-5'>
        <button onClick={handlePrev}
          className='mr-5 hover:text-blue-600'
        >
          <ChevronLeftIcon className='w-10'/>
        </button>
        <button onClick={handleNext}
          className='ml-5 hover:text-blue-600'
        >
          <ChevronRightIcon className='w-10'/>
        </button>
      </div>

      <div className='relative md:w-[80%] mx-auto p-2'>
        <motion.h2 
          initial={{opacity: 0, y: '-50vh'}}
          animate={{opacity: 1, y : 0}}
          transition={{duration: .5}}
          className='text-white mt-10 text-4xl md:text-6xl font-bold tracking-widest'
        >
          Explore
        </motion.h2>

        <motion.h2 
          initial={{opacity: 0, y: '-50vh'}}
          animate={{opacity: 1, y : 0}}
          transition={{duration: .6}}
          className='text-white text-4xl md:text-6xl font-bold tracking-widest'
        >
          Our
        </motion.h2>


        <motion.h2 
          initial={{opacity: 0, y: '-50vh'}}
          animate={{opacity: 1, y : 0}}
          transition={{duration: .7}}
          className='text-3xl md:text-7xl font-bold tracking-widest uppercase text-slate-300'
        >
          {slide.title}
        </motion.h2>

        <motion.h2 
          initial={{opacity: 0, y: '-50vh'}}
          animate={{opacity: 1, y : 0}}
          transition={{duration: .8}}
          className='text-white text-4xl md:text-6xl font-bold tracking-widest mb-5'
        >
          Collection
        </motion.h2>

        <motion.div
          initial={{opacity: 0, y: '-50vh'}}
          animate={{opacity: 1, y : 0}}
          transition={{duration: .9}}
        >
          <Link href={`/${slide.title}`}
            className='border py-2 px-4 hover:border-blue-600 hover:bg-blue-600 text-white'
          >
            Shop Now
          </Link>
        </motion.div>
      </div>
    </div>
  )
}

export default Showcase