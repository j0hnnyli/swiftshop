'use client'
import { useRouter } from 'next/navigation'
import {useState, useEffect} from 'react'
import { useDebounce } from 'use-debounce'

type Props = {
  category : string
}

const SearchBar = ( {category} : Props ) => {
  const router = useRouter();
  const [value, setValue] = useState('');
  const [ query ] = useDebounce(value, 500)

  useEffect(() => {
    router.push(`/${category}?search=${value.toLowerCase()}`) 
  } , [query, router])

  return (
    <div className='my-2'>
      <input type="text" 
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder= 'Search Here . . .'
        className='w-full py-2 px-4 border border-black rounded-2xl dark:border-gray-500'
      />
    </div> 

  )
}

export default SearchBar