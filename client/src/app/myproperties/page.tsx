"use client";

import { useEffect, useState } from "react";
import PropertyList from "@/components/properties/PropertyList";
import { getUserId } from "@/lib/action";
import Image from "next/image";
import { useUserStore } from "@/store/useUserStore";

const MyPropertiesPage = () => {
  const { user } = useUserStore();

  return (
    <main className="max-w-[1500px] mx-auto px-6 pb-6">
      <h1 className="my-6 text-2xl">My properties</h1>

      <div className="flex justify-center">
        <PropertyList landlord_id={user?.id || ""} className="w-full" />
      </div>
    </main>
  );
};

export default MyPropertiesPage;
