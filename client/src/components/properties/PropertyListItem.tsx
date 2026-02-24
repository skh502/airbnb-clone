import { PropertyType } from "@/types/general";
import { Heart } from "lucide-react";
import Image from "next/image";

interface PropertyItemProps {
  property: PropertyType;
  handleFavoriteToggle: (e: React.MouseEvent, id: string) => void;
}

const PropertyListItem = ({
  property,
  handleFavoriteToggle,
}: PropertyItemProps) => {
  return (
    <div className="flex flex-col gap-2 w-64">
      <div className="overflow-hidden aspect-square rounded-xl relative">
        <Image
          src={property.image_url}
          width={256}
          height={256}
          priority
          className="object-cover w-full h-full hover:scale-110 transition"
          alt={property.title}
        />

        <Heart
          className={`absolute right-1 top-1 w-6 h-6 text-white 
            ${property?.is_favorited && "fill-airbnb"}
            `}
          onClick={(e) => handleFavoriteToggle(e, property?.id)}
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
