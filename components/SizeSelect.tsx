"use client";
import { cartContext } from "@/context/CartContext";
import { ChangeEvent, useContext } from "react";

type Props = {
  category: string;
  id: number;
  defaultSize: string;
};

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
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

const SizeSelect = ({ category, id, defaultSize }: Props) => {
  const { cart, setCart } = useContext(cartContext);

  function handleSizeChange(e: ChangeEvent<HTMLSelectElement>) {
    const newSize = e.target.value;

    setCart(
      cart.map((item) => (item.id === id ? { ...item, size: newSize } : item)),
    );
  }

  return (
    <select
      name="quantity"
      defaultValue={defaultSize}
      onChange={handleSizeChange}
      className=" w-[70px] px-1 hover:cursor-pointer mb-1 mx-2"
    >
      {category === "Clothes" ? (
        <>
          {sizes.map((size: string) => (
            <option key={size}> {size} </option>
          ))}
        </>
      ) : (
        <>
          {shoeSizes.map((size: string) => (
            <option key={size}> {size} </option>
          ))}
        </>
      )}
    </select>
  );
};

export default SizeSelect;
