'use client'
import { Category } from '@/TS/categoryType'
import Link from 'next/link'
import { useRef, useState, useEffect, useCallback } from 'react'
import Image from 'next/image'

type Props = {
  categories: Category[] | null;
}

const CategoryCard = ({ categories }: Props) => {
  const [showCard, setShowCard] = useState(false);
  const ref = useRef<HTMLDivElement>(null);


  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      setShowCard(false);
    }
  }, [])

  useEffect(() => {
    if(showCard){
      window.addEventListener('mousedown', handleClickOutside);
    }

    return () => window.removeEventListener('mousedown', handleClickOutside);
  }, [showCard, handleClickOutside]);

  return (
    <div className='relative'>
      <button
        disabled={showCard}
        onClick={() => setShowCard(true)}
        className='cursor-pointer rounded-xl p-2 hover:bg-zinc-500 hover:text-orange-500'
      >
        Categories
      </button>

      {showCard && (
        <div
          ref={ref}
          className='bg-white dark:bg-black rounded-2xl p-3 ml-5 w-[400px] overflow-auto z-60 dark:border-slate-800 absolute right-[-150px]'
        >
          <h2 className='text-xl tracking-widest'>
            Categories
          </h2>
          <div className='grid grid-cols-3 gap-4 my-3'>
            <Link href='/all'
              onClick={() => setShowCard(false)}
              className='w-full hover:underline hover:text-orange-500 my-2'
            >
              <div className='flex flex-col items-center'>
                <Image
                  src='/allicon.png'
                  alt='All'
                  width={100}
                  height={100}
                  className='rounded-2xl'
                />
                <h2 className='text-center w-full'>
                  All
                </h2>
              </div>
            </Link>
            {categories?.map((category: Category) => (
              <Link href={`/${category.title}`}
                key={category.id}
                onClick={() => setShowCard(false)}
                className='w-full hover:underline hover:text-orange-500 my-2'
              >
                <div className='flex flex-col items-center'>
                  <img src={category.image_url} alt={category.title}
                    className='w-[100px] h-[100px] rounded-2xl'
                  />
                  <h2 className='text-center w-full'>
                    {category.title}
                  </h2>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default CategoryCard;
