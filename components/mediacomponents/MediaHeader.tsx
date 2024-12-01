import MediaNav from "./MediaNav";
import { Bars3Icon, ShoppingCartIcon } from "@heroicons/react/24/solid";
import ThemeButton from "../ThemeButton";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import CartList from "../CartList";
import Image from "next/image";
import Link from "next/link";

const MediaHeader = () => {
  return (
    <header className="md:hidden h-14 flex items-center justify-between py-2 px-3 bg-white dark:bg-slate-800 fixed top-0 w-full z-50">
      <div className="flex items-center">
        <Sheet>
          <SheetTrigger>
            <Bars3Icon className="w-7" />
          </SheetTrigger>

          <SheetContent side="left" className="bg-white dark:bg-black">
            <MediaNav />
          </SheetContent>
        </Sheet>

        <Link href="/" className="ml-2">
          <Image src="/logo.png" alt="logo" width={60} height={60} />
        </Link>
      </div>

      <div className="flex items-center">
        <ThemeButton />

        <Sheet>
          <SheetTrigger asChild className="flex items-center justify-center">
            <ShoppingCartIcon className="w-5" />
          </SheetTrigger>

          <SheetContent className="bg-white dark:bg-slate-800">
            <CartList />
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default MediaHeader;
