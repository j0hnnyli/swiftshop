import Image from "next/image";
import Link from "next/link";
import CarouselComponent from "@/components/CarouselComponent";
import HomePageSearchBar from "@/components/HomePageSearchBar";
import { Category } from "@/TS/categoryType";
import { ArrowLongRightIcon } from '@heroicons/react/24/solid'
import supabase from '@/connectSupaBase'
import LoopingText from "@/components/LoopingText";
import Showcase from "@/components/Showcase";

export default async function Home() {
  const {data: popular} = await supabase
    .from('populars')
    .select()
  const {data: categories} = await supabase.from('categories').select();
  
  
  return (
    <>
      <Showcase />

      <div className="max-w-[1800px] w-[85%] mx-auto mt-5">
        <h2 className="text-2xl tracking-widest mb-4">Popular Searches :</h2>

        <div className="lg:hidden flex items-center justify-center mt-[-15px]">
          <p>Swipe</p>
          <ArrowLongRightIcon className="w-6 ml-2"/>
        </div>

        <CarouselComponent 
          array={popular}
        /> 
      </div>
     
      
      <div className="w-[85%] mx-auto  max-w-[1800px] mt-5">        
        <h2 className="text-2xl tracking-widest mb-4">
          Shop By Categories 
        </h2>
        
        <div className="grid grid-cols-2 lg:grid-cols-5 items-center gap-4 mb-2">
          {categories?.map((category: Category) => (
            <div key={category.id}
              className='relative w-full h-[300px] '
            >
              <Image
                src={category.image_url}
                alt={category.title}
                layout="fill"
                objectFit="cover"
                className='absolute rounded-2xl'
              />

              <div className="absolute bg-black opacity-40 h-full w-full rounded-2xl z-20"/>

              <div className="absolute flex items-center justify-center  w-full h-full">
                <div className="relative z-30 flex flex-col items-center justify-center">                
                  <h2 className="text-white text-lg md:text-2xl tracking-widest mb-4">
                    {category.title}
                  </h2>

                  <Link href={`/${category.title}`}
                    className="border py-2 px-4 text-white rounded-2xl hover:bg-gray-500 mx-auto"
                  >
                    Shop Now
                  </Link>     
                  
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </>
  );
}
