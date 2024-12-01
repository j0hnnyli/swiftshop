"use client";

import { useContext } from "react";
import { cartContext } from "@/context/CartContext";
import Link from "next/link";
import SizeSelect from "./SizeSelect";
import { SheetClose } from "@/components/ui/sheet";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";


const CartList = () => {
  const { cart, handleRemove, setCart } = useContext(cartContext);

  const total = cart.reduce(
    (total, curr) => total + curr.price * curr.quantity,
    0,
  );

  function addQuantity(id: string) {
    setCart(
      cart.map((item) =>
        item.cartId === id
          ? { ...item, quantity: item.quantity + (item.quantity < 9 ? 1 : 0) }
          : item,
      ),
    );
  }

  function subQuantity(id: string) {
    setCart(
      cart.map((item) =>
        item.cartId === id
          ? { ...item, quantity: item.quantity - (item.quantity > 1 ? 1 : 0) }
          : item,
      ),
    );
  }

  return (
    <>
      <h2 className="text-3xl md:mt-5">My Cart : {cart.length} </h2>
      <div className="h-1 w-[90%] bg-indigo-600 rounded-2xl my-5"></div>
      <div className="h-[90%] lg:h-[87%] overflow-auto w-full relative pb-14">
        {cart.map((item) => (
          <div
            key={item.cartId}
            className="flex flex-col lg:flex-row my-4 justify-evenly items-center mb-10"
          >
            <div className="relative">
              <Image
                src={item.images[0]}
                alt={item.title}
                width={150}
                height={150}
                className="w-[150px] h-[150px] rounded-2xl"
              />
              <button
                onClick={() => handleRemove(item.cartId)}
                className="bg-red-500 text-white rounded-2xl hover:bg-red-800 absolute bottom-3 right-3 p-1"
              >
                <XMarkIcon className="w-5" />
              </button>
            </div>

            <div className="flex flex-col lg:w-[50%] ml-4">
              <Link
                href={`/product/${item.id}`}
                className="text-md mb-2 hover:underline hover:text-gray-500 "
              >
                <SheetClose>{item.title}</SheetClose>
              </Link>

              {(item.category !== "Clothes" && item.category !== "Shoes") ||
              item.title.includes("Cap") ? null : (
                <div className="flex justify-center lg:justify-start mx-auto mb-1">
                  <h2>Size : </h2>
                  <SizeSelect
                    category={item.category}
                    id={item.id}
                    defaultSize={item.size}
                  />
                </div>
              )}

              <div className="mb-2 flex items-center justify-between w-[90%] mx-auto">
                <h3>$ {item.price * item.quantity}</h3>

                <div className="flex items-center">
                  <button
                    onClick={() => subQuantity(item.cartId)}
                    className="px-2 rounded-2xl border border-black dark:border-gray-500 bg-indigo-300 hover:bg-indigo-500 hover:text-white"
                  >
                    -
                  </button>
                  <p className="mx-2">{item.quantity}</p>
                  <button
                    onClick={() => addQuantity(item.cartId)}
                    className="px-2 rounded-2xl border border-black dark:border-gray-500 bg-indigo-300 hover:bg-indigo-500 hover:text-white"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-3 bg-white dark:bg-slate-800 w-[90%]">
        <h3 className="text-2xl">Total: $ {total}</h3>
        <button className="w-full py-2 px-4 border rounded-2xl bg-black text-white hover:bg-slate-800 mx-auto">
          Checkout
        </button>
      </div>
    </>
  );
};

export default CartList;
