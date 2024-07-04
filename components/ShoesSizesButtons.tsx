"use client";
import { cartContext } from "@/context/CartContext";
import { useContext } from "react";

const sizes = [
  "8",
  "8.5",
  "9",
  "9.5",
  "10",
  "10.5",
  "11",
  "11.5",
  "12",
  "12.5",
  "13",
];

const ShoesSizes = () => {
  const { setSize, size } = useContext(cartContext);

  return (
    <div className="">
      <h2 className="text-center tracking-widest text-lg">Sizes :</h2>
      <div className="grid grid-cols-5">
        {sizes.map((shoeSize, index) => (
          <button
            key={index}
            onClick={() => setSize(shoeSize)}
            className={`py-2 px-4 border border-black dark:border-gray-500 rounded-2xl m-2 hover:bg-gray-800 hover:text-white 
              ${
                shoeSize === size &&
                "bg-indigo-800 text-white hover:bg-indigo-800"
              }
            `}
          >
            {shoeSize}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ShoesSizes;
