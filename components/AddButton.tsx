"use client";
import { useContext, useState, MouseEvent } from "react";
import { cartContext } from "@/context/CartContext";
import { Product } from "@/TS/productType";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import CartList from "./CartList";

type Props = {
  product: Product;
  variant: string;
};

const shoeSizes = [
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
const clothesSizes = ["XS", "S", "M", "L", "XL", "XXL"];

const AddButton = ({ product, variant }: Props) => {
  const { cart, handleAddCart, size, setCart } = useContext(cartContext);
  const [noSize, setNoSize] = useState(false);
  const [showSizes, setShowSizes] = useState(false);

  function addCart(product: Product, selectedSize: string) {
    const findItem = cart.find((item) => item.id === product.id);

    if (findItem && selectedSize === findItem.size) {
      setCart(
        cart.map((item) =>
          item.id === findItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      );
      return;
    }

    handleAddCart({
      ...product,
      size: selectedSize,
      cartId: `${product.id}-${selectedSize}`,
    });
  }

  function noSizeAdd(product: Product) {
    const findItem = cart.find((item) => item.id === product.id);

    if (findItem) {
      setCart(
        cart.map((item) =>
          item.id === findItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      );
      return;
    }

    handleAddCart({ ...product, cartId: `${product.id}` });
  }

  // add button is the product page
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (
      !size &&
      (product.category === "Clothes" || product.category === "Shoes") &&
      !product.title.includes("Cap")
    ) {
      e.preventDefault();
      setNoSize(true);
      setTimeout(() => setNoSize(false), 1200);
      return;
    }

    addCart(product, size);
  };

  return (
    <Sheet>
      {variant === "quick" && (
        <>
          {/* Check if the product category is 'Shoes' or 'Clothes' and the title doesn't include 'Cap' */}
          {product.category === "Shoes" ||
          (product.category === "Clothes" && !product.title.includes("Cap")) ? (
            <>
              {showSizes ? (
                // Display size selection options
                <div
                  onMouseLeave={() => setShowSizes(false)}
                  className="absolute bottom-0 z-30 left-0 p-1 overflow-hidden w-full mx-auto bg-white dark:bg-slate-800"
                >
                  {/* this displays the clothes sizes */}
                  {product.category === "Clothes" ? (
                    <div className="overflow-auto flex items-center gap-2 z-30 ">
                      {clothesSizes.map((size: string) => (
                        <SheetTrigger
                          key={size}
                          onClick={() => addCart(product, size)}
                          className="px-2 hover:bg-indigo-500 rounded-full hover:text-white"
                        >
                          {size}
                        </SheetTrigger>
                      ))}
                    </div>
                  ) : (
                    <div className="overflow-auto flex items-center gap-2 z-30">
                      {/* this displays the shoes sizes */}
                      {shoeSizes.map((size: string) => (
                        <SheetTrigger
                          key={size}
                          onClick={() => addCart(product, size)}
                          className="px-2 hover:bg-indigo-500 rounded-full  hover:text-white"
                        >
                          {size}
                        </SheetTrigger>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                // Display the quick add button
                <button
                  onClick={() => setShowSizes(true)}
                  className="border border-white dark:border-gray-500 absolute bottom-3 right-3 flex justify-center items-center rounded-full p-1 bg-gray-500 text-white hover:bg-gray-800 z-30"
                >
                  <p className="text-sm p-1">Add to Cart</p>
                </button>
              )}
            </>
          ) : (
            // For products that doesn't need size select
            <SheetTrigger
              onClick={() => noSizeAdd(product)}
              className={`border border-white dark:border-gray-500 absolute bottom-3 right-3 flex justify-center items-center rounded-full p-1 bg-gray-500 text-white hover:bg-gray-800 z-30`}
            >
              <p className="text-sm p-1">Add to Cart</p>
            </SheetTrigger>
          )}
        </>
      )}

      {variant === "add" && (
        <SheetTrigger
          onClick={handleClick}
          className={`py-2 px-4 my-4 rounded-2xl bg-indigo-400 text-gray-100 hover:bg-indigo-800 hover:text-white cursor-pointer
            ${noSize && "bg-red-500 hover:bg-red-500"}
            `}
        >
          {noSize ? "Requied Size!" : "Add to Cart"}
        </SheetTrigger>
      )}

      <SheetContent className="bg-white dark:bg-slate-800">
        <CartList />
      </SheetContent>
    </Sheet>
  );
};

export default AddButton;
