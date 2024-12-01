import Image from "next/image";
type Props = {
  images: string[];
};

const MediaImagesGallery = ({ images }: Props) => {
  return (
    <div className="lg:hidden flex items-center overflow-auto w-full h-[80%]">
      {images.map((img: string, index: number) => (
        <div key={index} className="flex-none w-full h-full">
          <Image
            src={img}
            alt={img}
            width={300}
            height={300}
            className="h-full w-full object-cover"
          />
        </div>
      ))}
    </div>
  );
};

export default MediaImagesGallery;
