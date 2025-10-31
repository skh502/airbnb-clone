import Image from "next/image";

import { PropertyType } from "./PropertyList";

interface PropertyItemProps {
  property: PropertyType;
}

const PropertyListItem = ({ property }: PropertyItemProps) => {
  return (
    <div className="cursor-pointer">
      <div className="relative overflow-hidden aspect-square rounded-xl w-50 h-50">
        <Image
          src={property.image_url}
          width={80}
          height={80}
          priority
          className="hover:scale-110 object-cover transition h-full w-full"
          alt={property.title}
        />
      </div>

      <div className="mt-2">
        <p className="text-lg font-bold">{property.title}</p>
      </div>

      <div className="mt-2">
        <p className="text-sm text-gray-500">
          <strong>${property.price_per_night}</strong> per night
        </p>
      </div>
    </div>
  );
};

export default PropertyListItem;
