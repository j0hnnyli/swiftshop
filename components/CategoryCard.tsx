"use client";

import { Category } from "@/TS/categoryType";
import Link from "next/link";
import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";

type Props = {
  categories: Category[] | null;
};

const CategoryCard = ({ categories }: Props) => {
  const [showCard, setShowCard] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const isButtonClicked =
        buttonRef.current && !buttonRef.current.contains(e.target as Node);
      const isContainerClicked =
        containerRef.current &&
        !containerRef.current.contains(e.target as Node);

      if (isButtonClicked && isContainerClicked) {
        setShowCard(false);
      }
    };

    window.addEventListener("mousedown", handleClickOutside);

    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, [showCard]);

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={() => setShowCard(!showCard)}
        className="cursor-pointer rounded-xl p-2 hover:bg-zinc-500 hover:text-orange-500"
      >
        Categories
      </button>

      {showCard && (
        <div
          ref={containerRef}
          onClick={() => setShowCard(false)}
          className="bg-white dark:bg-black rounded-2xl p-3 ml-5 w-[400px] overflow-auto z-60 dark:border-slate-800 absolute right-[-150px]"
        >
          <h2 className="text-xl tracking-widest">Categories</h2>
          <div className="grid grid-cols-3 gap-4 my-3">
            <Link
              href="/all"
              onClick={() => setShowCard(false)}
              className="w-full hover:underline hover:text-orange-500 my-2"
            >
              <div className="flex flex-col items-center">
                <Image
                  src="/allicon.png"
                  alt="All"
                  width={100}
                  height={100}
                  className="rounded-2xl"
                />
                <h2 className="text-center w-full">All</h2>
              </div>
            </Link>
            {categories?.map((category: Category) => (
              <Link
                href={`/${category.title}`}
                key={category.id}
                className="w-full hover:underline hover:text-orange-500 my-2"
              >
                <div className="flex flex-col items-center">
                  <Image
                    src={category.image_url}
                    alt={category.title}
                    width={100}
                    height={100}
                    className="w-[100px] h-[100px] rounded-2xl"
                  />
                  <h2 className="text-center w-full">{category.title}</h2>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryCard;
