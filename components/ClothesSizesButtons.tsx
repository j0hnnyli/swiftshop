"use client";
import { cartContext } from "@/context/CartContext";
import { useContext } from "react";

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

const ClothesSizes = () => {
  const { setSize, size } = useContext(cartContext);

  return (
    <div>
      <h2 className="text-center tracking-widest mb-2">Sizes</h2>
      {sizes.map((clotheSize, index) => (
        <button
          key={index}
          onClick={() => setSize(clotheSize)}
          className={`py-2 px-4 rounded-full border border-black dark:border-gray-500 ml-1 lg:mx-2 hover:bg-gray-800 hover:text-white
            ${
              clotheSize === size &&
              "bg-indigo-800 text-white hover:bg-indigo-800"
            }
          `}
        >
          {clotheSize}
        </button>
      ))}
    </div>
  );
};

export default ClothesSizes;
