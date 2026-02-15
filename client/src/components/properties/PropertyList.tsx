"use client";
import { useEffect, useState } from "react";
import PropertyListItem from "./PropertyListItem";
import apiService from "@/services/apiService";
import { useRouter } from "next/navigation";
import { PropertyType } from "@/types/general";

type Props = {
  landlord_id?: string;
  className?: string;
};

const PropertyList = ({ landlord_id, className }: Props) => {
  const router = useRouter();
  const [properties, setProperties] = useState<PropertyType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getProperties = async () => {
    let url = `/api/properties/`;
    try {
      setIsLoading(true);
      if (landlord_id) {
        url += `?landlord_id=${landlord_id}`;
      }
      const tempData = await apiService.get(`${url}`);
      setProperties(tempData);
      // console.log(tempData)
    } catch (error) {
      console.error("Error fetching properties:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProperties();
  }, [landlord_id]);

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
          <PropertyListItem property={property} />
        </div>
      ))}
    </div>
  );
};

export default PropertyList;
