import React from "react";
import Card from "@/components/Card";
import { Product } from "@/TS/productType";
import SideColumn from "../SideColumn";
import supabase from "@/connectSupaBase";

type Props = {
  params: {
    [category: string]: string;
  };
  searchParams: string;
};

const page = async ({ params, searchParams }: Props) => {
  const param = searchParams.search ? String(searchParams.search) : "";

  let products: Product[] = [];

  if (params.category === "all") {
    const { data: allProducts, error } = await supabase
      .from("products")
      .select();

    if (error) return null;

    products = allProducts;
  } else {
    const { data: filteredProducts, error } = await supabase
      .from("products")
      .select()
      .eq("category", params.category);

    if (error) return null;

    products = filteredProducts;
  }

  const filtered = products?.filter((product: Product) => {
    if (
      product.title.includes(param) ||
      product.description.includes(param) ||
      product.category.toLowerCase().includes(param)
    ) {
      return product;
    }
  });

  return (
    <div className="flex flex-col lg:flex-row mt-10">
      <SideColumn selected={params.category} />

      <div className="p-4 lg:w-[85%] lg:ml-[20%]">
        <h2 className="text-3xl tracking-widest">
          {params.category === "all" ? " All Products" : params.category} :{" "}
          {filtered.length}
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-5">
          {filtered.map((product: Product) => (
            <Card
              key={product.id}
              id={product.id}
              image={product.images[0]}
              price={product.price}
              title={product.title}
              product={product}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
