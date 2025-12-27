import { PropertyType } from "@/types/general";
import Image from "next/image";

interface PropertyItemProps {
  property: PropertyType;
}

const PropertyListItem = ({ property }: PropertyItemProps) => {
  return (
    <div className="flex flex-col gap-2 w-64">
      <div className="overflow-hidden aspect-square rounded-xl">
        <Image
          src={property.image_url}
          width={256}
          height={256}
          priority
          className="object-cover w-full h-full hover:scale-110 transition"
          alt={property.title}
        />
      </div>

      <div className="flex flex-col gap-1">
        <p className="text-lg font-bold">{property.title}</p>
        <div className="">
          <p className="text-sm text-gray-500">
            <strong>${property.price_per_night}</strong> per night
          </p>
        </div>
      </div>
    </div>
  );
};

export default PropertyListItem;
