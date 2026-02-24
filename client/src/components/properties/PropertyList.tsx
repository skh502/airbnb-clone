"use client";
import { useEffect, useState } from "react";
import PropertyListItem from "./PropertyListItem";
import apiService from "@/services/apiService";
import { useRouter } from "next/navigation";
import { PropertyType } from "@/types/general";
import { useUserStore } from "@/store/useUserStore";
import { toast } from "sonner";

type Props = {
  landlord_id?: string;
  className?: string;
};

const PropertyList = ({ landlord_id, className }: Props) => {
  const router = useRouter();
  const [properties, setProperties] = useState<PropertyType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useUserStore();

  const getProperties = async () => {
    let url = `/api/properties/`;
    try {
      setIsLoading(true);
      if (landlord_id) {
        url += `?landlord_id=${landlord_id}`;
      }
      const tempData = await apiService.get(`${url}`);
      setProperties(tempData);
      console.log(tempData);
    } catch (error) {
      console.error("Error fetching properties:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProperties();
  }, [landlord_id]);

  const handleFavoriteToggle = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();

    if (!user?.id) {
      toast.error("please login first");
      return;
    }

    const response = await apiService.post(
      `/api/properties/${id}/toggle_favorite/`,
      {},
    );
    setProperties((prev) =>
      prev.map((property) =>
        property.id === id
          ? {
              ...property,
              is_favorited: response.is_favorited,
            }
          : property,
      ),
    );
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={`flex flex-wrap gap-6 justify-start ${className}`}>
      {properties?.map((property) => (
        <div
          key={property.id}
          className="rounded-md transition cursor-pointer"
          onClick={() => router.push(`/properties/${property.id}`)}
        >
          <PropertyListItem
            property={property}
            handleFavoriteToggle={handleFavoriteToggle}
          />
        </div>
      ))}
    </div>
  );
};

export default PropertyList;
