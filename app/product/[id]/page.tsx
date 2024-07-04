import { Product } from '@/TS/productType'
import Link from 'next/link'
import Image from 'next/image'
import AddButton from '@/components/AddButton'
import BreadCrumbComponent from '@/components/BreadCrumbComponent'
import ClothesSizes from '@/components/ClothesSizesButtons'
import ShoesSizes from '@/components/ShoesSizesButtons'
import QuantitySelect from '@/components/QuantitySelect'
import MediaImagesGallery from '@/components/mediacomponents/MediaImagesGallery'
import supabase from '@/connectSupaBase'

type Props = {
  params: {
    [id: string] : string
  }
}

const ProductPage = async ({ params } : Props) => {
  const parsedId = parseInt(params.id)
  const {data: product}  = await supabase
    .from('products')
    .select()
    .eq('id', parsedId)
    .single()

  const {data: recommend} = await supabase
    .from('products')
    .select()
    .eq('category', product.category)

  
  return (
    
    <div className='flex flex-col lg:flex-row  md:mt-[-12px]'>
      
      <div 
        className='w-[50%] h-screen scrollbar-hide overflow-auto hidden lg:inline'
      >
        {product.images.map((img: string, index: number) => (
          <div key={index} 
            className='md:h-[70vh] md:w-full my-2'
          >
            <Image
              src={img}
              alt={img}
              width={300}
              height={300}
              className='w-full h-full object-cover'
            />
          </div>
        ))}
        <div className='h-[30vh] w-full'/>
      </div>
      
      <MediaImagesGallery images={product.images} />
      
     

      <div className='flex flex-col items-center relative lg:w-[50%] pt-20 p-2  h-screen lg:overflow-auto'>
        <BreadCrumbComponent 
          crumbs={[
            { 
              href: '/',
              name: 'Home'
            },
            {
              href: `/${product.category}`,
              name: `${product.category}`
            }, 
            {
              name: `${product.title}`
            }
          ]}
        />

        
        <h2 
          className='text-2xl tracking-widest mb-5 w-[80%] text-center'
        >
          {product.title}
        </h2>
        
        <div className='flex w-full justify-evenly'>
          <h3 className='mb-3'>
            Cateogry : 
            <Link href={`/${product.category}`}
              className='ml-2 hover:underline hover:text-gray-500'
            >
              {product.category}
            </Link>
          </h3>
          <h3>Quantity : <QuantitySelect/> </h3>
        </div>
        
        
        <h3 className='mb-3 text-lg'>$ {product.price}</h3>
        
        
        <div className='my-4'>
          {
            (product.category === 'Clothes' && 
            !product.title.includes('Cap')) && (
            <ClothesSizes/>
            )
          }

          {product.category === 'Shoes' && (
            <ShoesSizes/>
          )}
        </div>

        <h4 className='w-[80%]'>
          Description : {product.description}
        </h4>
        <AddButton 
          product={product} 
          variant='add'
        />

        <div className='md:w-[90%]'>
          <h2 className='text-2xl'>Recommend : {recommend?.length}</h2>
          <div className='overflow-auto h-[400px]'>
            {recommend?.map((recom : Product) => (
              <div key={recom.id}
                className='flex flex-col md:flex-row items-center justify-between mb-2 h-[300px]  md:h-[220px]'
              > 
                <Image
                  src={recom.images[0]}
                  alt={recom.title}
                  width={200}
                  height={200}
                  className='rounded-2xl'
                />

                <div className='relative h-[200px] md:h-[70%] text-center w-full'>
                  <Link
                    href={`/product/${recom.id}`}
                    className="text-md w-full mb-2 hover:underline hover:text-gray-500 "
                  >
                    {recom.title}               
                  </Link>
                  <h3 className='text-lg'>
                    $ {recom.price}
                  </h3>

                  <AddButton 
                    product={recom}
                    variant='quick'
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div> 

    </div>
    
  )
}

export default ProductPage
