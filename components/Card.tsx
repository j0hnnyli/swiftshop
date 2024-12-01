import Link from "next/link";
import AddButton from "./AddButton";
import Image from "next/image";
import { Product } from "@/TS/productType";

type Props = {
  image: string;
  title: string;
  id: number;
  price: number;
  product: Product;
};

const Card = ({ image, title, id, price, product }: Props) => {
  return (
    <div className="relative rounded-xl hover:border-2 hover:border-black dark:hover:border-gray-500 hover:p-1 z-30">
      <Link
        href={`/product/${id}`}
        className="absolute h-full w-full z-20 rounded-xl "
      ></Link>

      <div className="relative">
        <Image
          src={image}
          alt={title}
          width={500}
          height={300}
          className="w-full rounded-xl"
        />
        <AddButton product={product} variant="quick" />
      </div>

      <h2 className="text-sm my-2">{title}</h2>
      <h3>$ {price}</h3>
    </div>
  );
};

export default Card;
