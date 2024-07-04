import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { SheetClose } from "@/components/ui/sheet"
import { getCategories } from '@/TS/fetchData'
import MediaCategoryDropDown from './MediaCategoryDropDown'
import supabase from '@/connectSupaBase'

const MediaNav = async () => {
  const {data : categories} = await supabase.from('categories').select();

  return (
    <div className='flex flex-col items-center justify-center'>
      <div className='flex items-center flex-col justify-center'>
        <div>
          <Image 
            src='/logo.png' 
            alt='logo'
            width={100}
            height={100}
            sizes='100'
          />
        </div>
        <h1 className='text-2xl'>SwiftShop</h1>
      </div>

      <div className='mt-10 flex flex-col w-[90%]'>
        <Link href='/' 
          className='text-xl'
        >
          <SheetClose className='w-full text-left'>
            Home
          </SheetClose>
        </Link>

        <Link href='/all' 
          className='text-xl mt-4'
        >
          <SheetClose className='w-full text-left'>
            Search
          </SheetClose>
        </Link>

        <MediaCategoryDropDown categories={categories}/>
      </div>
    </div>
  )
}

export default MediaNav