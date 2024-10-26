import ThemeButton from './ThemeButton'
import HoverTip from './HoverTip'
import Image from 'next/image'
import Link from 'next/link'
import { ShoppingCartIcon} from '@heroicons/react/24/solid'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import CartList from './CartList'
import CategoryCard from './CategoryCard'
import supabase from '@/connectSupaBase'

const Header = async () => {
  const {data: categories }= await supabase
    .from('categories')
    .select();

  return (
    <header 
      className='fixed top-0 w-full bg-white dark:bg-slate-800 py-2 hidden lg:inline z-50 h-24 md:flex justify-center items-center'
    >
      <div className='flex items-center justify-between pr-6 max-w-[1800px] mx-auto w-full'>
        <div className='flex items-center'>
          <div className=''>
            <Image 
              src='/logo.png' 
              alt='logo'
              width={100}
              height={100}
              sizes='50'
            />
          </div>
          <Link href='/' 
            className='ml-[-20px] hover:underline hover:text-gray-500'
          >
            SwiftShop
          </Link>
        </div>
        
        <div className='flex items-center'> 
          <Link 
            href= '/'
            className='ml-4 rounded-xl p-2 hover:bg-zinc-500 hover:text-orange-500 '
          >
            Home
          </Link>

          <CategoryCard categories={categories}/>

          <Link href='/all'
            className='rounded-xl p-2 hover:bg-zinc-500 hover:text-orange-500 '
          >
            Search
          </Link>
          <ThemeButton/>
         
          <Sheet>
            <HoverTip tip='Cart'>
              <SheetTrigger asChild
                className='flex items-center justify-center'
              >
                <ShoppingCartIcon className='w-5'/>
              </SheetTrigger>
            </HoverTip>

            <SheetContent
              className='bg-white dark:bg-slate-800'
            >
              <CartList />
            </SheetContent>
          </Sheet>            
        </div>

      </div>
    </header>
  )
}

export default Header