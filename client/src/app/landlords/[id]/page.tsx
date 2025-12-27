"use client";
import { useEffect, useState } from "react";
import ContactButton from "@/components/ContactButton";
import PropertyList from "@/components/properties/PropertyList";
import apiService from "@/services/apiService";
import Image from "next/image";
import { useParams } from "next/navigation";
import { LandlordType } from "@/types/general";

const LandlordDetailPage = () => {
  const params = useParams();
  const [landlordData, setLandlordData] = useState<LandlordType>();
  const [isLoading, setIsLoading] = useState(true);

  const getLandlordDetail = async () => {
    try {
      setIsLoading(true);
      const result = await apiService.get(`/api/auth/${params?.id}`);
      // console.log(result);
      setLandlordData(result);
    } catch (error) {
      console.error("Error fetching landlord detail:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getLandlordDetail();
  }, []);

  return (
    <main className="max-w-[1500px] mx-auto px-6 pb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <aside className="col-span-1 mb-4">
          <div className="flex flex-col items-center p-6 rounded-xl border border-gray-300 shadow-xl">
            {isLoading ? (
              <div className="w-full h-60 animate-pulse"></div>
            ) : (
              <Image
                src={landlordData?.avatar_url || "/profile_pic_1.jpg"}
                width={200}
                height={200}
                alt="Landlrod name"
                className="rounded-full"
              />
            )}

            <h1 className="mt-6 text-2xl">{landlordData?.name}</h1>

            <ContactButton />
          </div>
        </aside>

        <div className="col-span-1 md:col-span-3 pl-0 md:pl-6">
          <div className="flex justify-center">
            <PropertyList
              // landlord_id={typeof params.id === "string" ? params.id : ""}
              landlord_id={Array.isArray(params?.id) ? params.id[0] : params.id}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default LandlordDetailPage;
