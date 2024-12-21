import { Product } from "@/TS/productType";
import Link from "next/link";
import Image from "next/image";
import AddButton from "@/components/AddButton";
import BreadCrumbComponent from "@/components/BreadCrumbComponent";
import ClothesSizes from "@/components/ClothesSizesButtons";
import ShoesSizes from "@/components/ShoesSizesButtons";
import QuantitySelect from "@/components/QuantitySelect";
import MediaImagesGallery from "@/components/mediacomponents/MediaImagesGallery";
import supabase from "@/connectSupaBase";

type Props = {
  params: {
    [id: string]: string;
  };
};

const ProductPage = async ({ params }: Props) => {
  const parsedId = parseInt(params.id);
  const { data: product } = await supabase
    .from("products")
    .select()
    .eq("id", parsedId)
    .single();

  const { data: recommend } = await supabase
    .from("products")
    .select()
    .eq("category", product.category);

  return (
    <div className="flex flex-col lg:flex-row  md:mt-[-12px]">
      <div className="w-[50%] h-screen scrollbar-hide overflow-auto hidden lg:inline">
        {product.images.map((img: string, index: number) => (
          <div key={index} className="md:h-[70vh] md:w-full my-2">
            <Image
              src={img}
              alt={img}
              width={300}
              height={300}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
        <div className="h-[30vh] w-full" />
      </div>

      <MediaImagesGallery images={product.images} />

      <div className="flex flex-col items-center relative lg:w-[50%] pt-20 p-2">
        <BreadCrumbComponent
          crumbs={[
            {
              href: "/",
              name: "Home",
            },
            {
              href: `/${product.category}`,
              name: `${product.category}`,
            },
            {
              name: `${product.title}`,
            },
          ]}
        />

        <h2 className="text-2xl tracking-widest mb-5 w-full md:w-[80%] text-center">
          {product.title}
        </h2>

        <div className="flex w-full justify-evenly">
          <h3 className="mb-3">
            Cateogry :
            <Link
              href={`/${product.category}`}
              className="ml-2 hover:underline hover:text-gray-500"
            >
              {product.category}
            </Link>
          </h3>
          <h3>
            Quantity : <QuantitySelect />{" "}
          </h3>
        </div>

        <h3 className="mb-3 text-lg">$ {product.price}</h3>

        <div className="my-4">
          {product.category === "Clothes" && !product.title.includes("Cap") && (
            <ClothesSizes />
          )}

          {product.category === "Shoes" && <ShoesSizes />}
        </div>

        <h4 className="p-2 md:w-[80%]">{product.description}</h4>

        <AddButton product={product} variant="add" />

        <div className="w-full md:w-[90%]">
          <h2 className="text-2xl">Recommend : {recommend?.length}</h2>
          <div className="overflow-x-auto flex gap-3 ">
            {recommend?.map((recom: Product) => (
              <div key={recom.id}>
                <div className="w-[200px] h-[200px] relative">
                  <Image
                    src={recom.images[0]}
                    alt={recom.title}
                    width={300}
                    height={300}
                    className="w-full h-full"
                  />
                  <AddButton product={recom} variant="quick" />
                </div>
                <p>{recom.title.slice(0, 20)} . .</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
