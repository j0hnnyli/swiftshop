'use client'
import {
  createContext, ReactNode, useState, 
  useEffect, Dispatch, SetStateAction
} from 'react'
import { Product } from '@/TS/productType'

type CartContextProps = {
  cart : Product[];
  size: string;
  quantity: number;
  handleAddCart : (item: Product) => void;
  handleRemove : (id: string) => void;
  setCart: Dispatch<SetStateAction<Product[]>>;
  setSize : Dispatch<SetStateAction<string>>;
  setQuantity: Dispatch<SetStateAction<number>>
}

const initialCart: Product[] = [];

const cartContext = createContext<CartContextProps>({
  cart: initialCart,
  size: '',
  quantity: 1,
  handleAddCart: (item: Product) => {},
  handleRemove: (id: string) => {},
  setCart: () => initialCart,
  setSize : () => {},
  setQuantity: () => {}
});
const CartContextProvider = ({ children } : { children: ReactNode }) => {
  const storageCart = typeof window !== 'undefined'&&  JSON.parse(localStorage.getItem("cart") || '[]')
  const [cart, setCart] = useState<Product[]>(storageCart);
  const [size, setSize] = useState('');
  const [quantity, setQuantity] = useState(1);

  function handleAddCart(item: Product){
    const cartItem = {
      ...item,
      quantity: quantity,
    }

    setCart([cartItem, ...cart])
    setQuantity(1)
    setSize('')
  }

  function handleRemove(id: string){
    const filtered = cart.filter( (item) => item.cartId !== id )

    setCart(filtered)
  }

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  } , [cart])

  const contextValue = {
    cart, handleAddCart, handleRemove, 
    setCart, setQuantity, 
    setSize, size, quantity
  }


  return (
    <cartContext.Provider value={contextValue}>
      {children}
    </cartContext.Provider>
  )
}

export {CartContextProvider, cartContext}