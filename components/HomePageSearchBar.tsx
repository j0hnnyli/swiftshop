"use client";
import { useState, useEffect, ReactNode } from "react";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { Product } from "@/TS/productType";
import Link from "next/link";
import Image from "next/image";
import { getProducts } from "@/TS/fetchData";

const HomePageSearchBar = () => {
  const [value, setValue] = useState("");
  const [products, setproducts] = useState<Product[] | null>([]);
  const filtered = products?.filter((product: Product) => {
    if (!value) {
      return null;
    } else {
      if (
        product.title.toLowerCase().includes(value.toLowerCase()) ||
        product.description.toLowerCase().includes(value.toLowerCase()) ||
        product.category.toLowerCase().includes(value.toLowerCase())
      ) {
        return product;
      }
    }
  });

  useEffect(() => {
    async function data() {
      const products = await getProducts();

      setproducts(products);
    }

    data();
  }, []);

  return (
    <div className="relative my-5 w-[70%] max-w-[1200px] mx-auto">
      <div className="flex items-center border border-black dark:border-gray-500  rounded-2xl ">
        <div className="p-2">
          <MagnifyingGlassIcon className="w-7" />
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search for something ..."
          className="p-3 outline-none w-full"
        />

        <button onClick={() => setValue("")} className="p-2">
          <XMarkIcon className="w-7" />
        </button>
      </div>

      {value && (
        <div className="absolute z-50 bg-white h-[500px] overflow-auto w-[98%] mx-auto ml-3">
          <h2 className=" dark:bg-gray-600 pt-4 px-4">
            Results : {filtered?.length}
          </h2>
          {!filtered?.length && (
            <div className="h-full w-full flex items-center justify-center  dark:bg-gray-600 ">
              <h2 className="text-2xl text-red-500">
                No Mathces from search : {value}
              </h2>
            </div>
          )}

          {filtered?.map((product: Product) => {
            return (
              <div
                key={product.id}
                className="flex flex-col md:flex-row items-center justify-between py-2 px-4 hover:bg-gray-300 cursor-pointer dark:bg-gray-600 hover:dark:bg-gray-900"
              >
                <Image
                  src={product.images[0]}
                  alt={product.title}
                  width={150}
                  height={150}
                  className="rounded-2xl"
                />
                <div className="text-center w-[200px]">
                  <Link href={`/product/${product.id}`}>{product.title}</Link>
                  <p>$ {product.price}</p>
                </div>
                <div />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default HomePageSearchBar;
