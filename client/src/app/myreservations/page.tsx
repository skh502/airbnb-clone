"use client";
import { useEffect, useState } from "react";
import { useUserStore } from "@/store/useUserStore";
import Image from "next/image";
import apiService from "@/services/apiService";
import { ReservationType } from "@/types/general";
import { useRouter } from "next/navigation";

const MyReservationsPage = () => {
  const router = useRouter();
  const { user } = useUserStore();
  const [isLoading, setIsLoading] = useState(true);
  const [reservationsData, setReservationsData] = useState<ReservationType[]>(
    [],
  );

  const getReservations = async () => {
    try {
      setIsLoading(true);
      const result = await apiService.get(`/api/auth/myreservations`);
      setReservationsData(result);
    } catch (error) {
      console.error("Error fetching landlord detail:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!user?.id) {
      setReservationsData([]);
      return;
    }
    getReservations();
  }, []);

  return (
    <main className="max-w-[1500px] mx-auto px-6 pb-6">
      <h1 className="my-6 text-2xl">My reservations</h1>

      <div className="space-y-4">
        {reservationsData?.map((eachData, idx) => {
          return (
            <div
              key={`${eachData?.id}-${idx}`}
              className="p-5 grid grid-cols-1 md:grid-cols-4 gap-4 shadow-md border border-gray-300 rounded-xl"
            >
              <div className="col-span-1">
                <div className="relative overflow-hidden aspect-square rounded-xl">
                  <Image
                    fill
                    src={eachData?.property?.image_url || "/beach_1.jpg"}
                    className="hover:scale-110 object-cover transition h-full w-full"
                    alt="Beach house"
                  />
                </div>
              </div>

              <div className="col-span-1 md:col-span-3">
                <h2 className="mb-4 text-xl">
                  Property name: {eachData?.property?.title}
                </h2>

                <p className="mb-2">
                  <strong>Check in date:</strong> {eachData?.start_date}
                </p>
                <p className="mb-2">
                  <strong>Check out date:</strong> {eachData?.end_date}
                </p>

                <p className="mb-2">
                  <strong>Number of nights:</strong>{" "}
                  {eachData?.number_of_nights}
                </p>
                <p className="mb-2">
                  <strong>Total price:</strong> {eachData?.total_price}
                </p>

                <div
                  className="mt-2 inline-block cursor-pointer py-4 px-6 bg-airbnb text-white rounded-xl"
                  onClick={() =>
                    router.push(`/properties/${eachData?.property?.id}`)
                  }
                >
                  Go to property
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default MyReservationsPage;
