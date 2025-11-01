"use client";
import { useEffect, useState } from "react";
import PropertyListItem from "./PropertyListItem";
import apiService from "@/services/apiService";
import { useRouter } from "next/navigation";
import { PropertyType } from "@/types/general";

const PropertyList = () => {
  const router = useRouter();
  const [properties, setProperties] = useState<PropertyType[]>([]);

  const getProperties = async () => {
    try {
      const tempData = await apiService.get("/api/properties/");
      setProperties(tempData);
    } catch (error) {
      console.error("Error fetching properties:", error);
    }
  };

  useEffect(() => {
    getProperties();
  }, []);

  return (
    <div className="flex flex-wrap gap-6 justify-start">
      {properties?.map((property) => (
        <div
          key={property.id}
          className="rounded-md transition cursor-pointer"
          onClick={() => router.push(`properties/${property.id}`)}
        >
          <PropertyListItem property={property} />
        </div>
      ))}
    </div>
  );
};

export default PropertyList;
