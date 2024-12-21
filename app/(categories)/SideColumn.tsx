import Link from "next/link";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { Category } from "@/TS/categoryType";
import SearchBar from "./SearchBar";
import supabase from "@/connectSupaBase";
import Image from "next/image";

type Props = {
  selected: string;
};

const SideColumn = async ({ selected }: Props) => {
  const { data: categories } = await supabase.from("categories").select();

  return (
    <div className="lg:w-[20%] lg:max-w-[350px] p-2 lg:fixed">
      <SearchBar category={selected} />

      <div>
        <h2 className="text-center tracking-widest text-lg">Categories</h2>
        <div className="flex gap-2 lg:flex-col p-2 w-full overflow-auto ">
          <div>
            <Link
              href={`/all`}
              className={`
              flex flex-col lg:flex-row items-center justify-between my-2 p-2 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-700 w-[120px] lg:w-full
              ${selected === "all" && "dark:bg-gray-500 bg-gray-200"}
            `}
            >
              <Image
                src="/allicon.png"
                alt="all"
                width={300}
                height={300}
                className="lg:w-[50px] lg:h-[50px] rounded-full"
              />

              <h2>All</h2>

              <ChevronRightIcon className="w-[20px] hidden lg:flex" />
            </Link>
          </div>

          {categories?.map((category: Category) => (
            <div key={category.id}>
              <Link
                href={`/${category.title}`}
                key={category.id}
                className={`
                  flex flex-col lg:flex-row items-center justify-between my-2 p-2 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-700 w-[120px]
                  lg:w-full 
                  ${
                    selected === category.title &&
                    "dark:bg-gray-500 bg-gray-200"
                  }
                `}
              >
                <Image
                  src={category.image_url}
                  alt={category.title}
                  width={300}
                  height={300}
                  className="lg:w-[50px] lg:h-[50px] rounded-full"
                />

                <h2>{category.title}</h2>

                <ChevronRightIcon className="w-[20px] hidden lg:inline" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SideColumn;
