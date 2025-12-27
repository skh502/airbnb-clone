"use client";

import { useEffect, useState } from "react";
import ReservationSidebar from "@/components/properties/ReservationSidebar";
import apiService from "@/services/apiService";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { PropertyDetailType } from "@/types/general";
import { getUserId } from "@/lib/action";
import Link from "next/link";

const PropertyDetailPage = () => {
  const pathname = usePathname();
  const propertyId = pathname.split("/").filter(Boolean)[1] ?? "";

  const [detailData, setDetailData] = useState<PropertyDetailType>();
  const [userId, setUserId] = useState<string | null>(null);

  const getPropertyDetail = async () => {
    try {
      const tempData = await apiService.get(`/api/properties/${propertyId}`);
      setDetailData(tempData);
    } catch (error) {
      console.error("Error fetching property detail:", error);
    }
  };

  const fetchUserId = async () => {
    const id = await getUserId();
    setUserId(id);
  };

  useEffect(() => {
    getPropertyDetail();
    fetchUserId();
  }, []);

  return (
    <main className="max-w-[1500px] mx-auto px-6 pb-6">
      <div className="w-full h-[64vh] mb-4 overflow-hidden rounded-xl relative">
        <Image
          fill
          src={detailData?.image_url || "/beach_1.jpg"}
          className="object-cover w-full h-full"
          alt="Beach house"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="py-6 pr-6 col-span-3">
          <h1 className="mb-4 text-4xl">{detailData?.title}</h1>

          <span className="mb-6 block text-lg text-gray-600">
            {`${detailData?.guests} guests - ${detailData?.bedrooms} bedrooms - ${detailData?.bathrooms} bathroom`}
          </span>

          <hr />

          <div className="py-6 flex items-center space-x-4">
            <Link
              href={`/landlords/${detailData?.landlord?.id}`}
              className={"y-6 flex items-center gap-1"}
            >
              <div className="w-12 h-12 rounded-full overflow-hidden hover:border-4 hover:border-blue-200 hover:scale-[0.9] transition-all duration-300 ease-in-out">
                <Image
                  src={detailData?.landlord?.avatar_url || "/profile_pic_1.jpg"}
                  width={50}
                  height={50}
                  className="w-full h-full object-cover"
                  alt="The user name"
                />
              </div>

              <p className="hover:text-blue-400 hover:underline transition-colors duration-200">
                <strong>{detailData?.landlord?.name}</strong> is your host
              </p>
            </Link>
          </div>

          <hr />

          <p className="mt-6 text-lg">{detailData?.description}</p>
        </div>

        <ReservationSidebar userId={userId} property={detailData} />
      </div>
    </main>
  );
};

export default PropertyDetailPage;
