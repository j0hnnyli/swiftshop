import React, { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

const layout = ({children}: Props) => {

  return (
    <main className='max-w-[1800px] mx-auto my-5'>
      {children} 
    </main>
  )
}

export default layout