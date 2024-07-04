"use client";
import { cartContext } from "@/context/CartContext";
import { ChangeEvent, useContext } from "react";

const quantityNum = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const QuantitySelect = () => {
  const { quantity, setQuantity } = useContext(cartContext);

  function handleQuantityChange(e: ChangeEvent<HTMLSelectElement>) {
    const newQuantity = parseInt(e.target.value);
    setQuantity(newQuantity);
  }

  return (
    <select
      name="quantity"
      value={quantity}
      onChange={handleQuantityChange}
      className=" w-[50px] px-1 hover:cursor-pointer"
    >
      {quantityNum.map((quan: number) => (
        <option key={quan}> {quan} </option>
      ))}
    </select>
  );
};

export default QuantitySelect;
