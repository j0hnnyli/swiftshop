import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Product } from "@/TS/productType";
import Card from "./Card";

type Props = {
  array: Product[] | null;
};

const CarouselComponent = ({ array }: Props) => {
  return (
    <Carousel
      opts={{
        slidesToScroll: 2,
        dragFree: true,
      }}
    >
      <CarouselContent>
        {array?.map((item) => (
          <CarouselItem
            key={item.id}
            className="basis-1/2 md:basis-1/3 lg:basis-1/4 2xl:basis-1/6"
          >
            <div className="relative z-10">
              <Card
                image={item.images[0]}
                title={item.title}
                price={item.price}
                id={item.product_id}
                product={item}
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselNext className="hidden lg:flex" />
      <CarouselPrevious className="hidden lg:flex" />
    </Carousel>
  );
};

export default CarouselComponent;
