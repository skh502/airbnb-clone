"use client";
import apiService from "@/services/apiService";
import { useUserStore } from "@/store/useUserStore";
import { usePathname } from "next/navigation";
import React, { ReactNode, useEffect, useState } from "react";

type Props = {
  children: ReactNode;
};

const UserInfoProvider = ({ children }: Props) => {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const { setUser } = useUserStore();

  const fetchUserDetail = async () => {
    try {
      const userData = await apiService.get(
        `/api/auth/user-profile/?include_email=true`,
      );
      setUser(userData);
      // console.log("form info provider:", userData);
    } catch (error) {
      // console.error("Error fetching user data:", error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserDetail();

    // or [pathname] as dependency
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return <>{children}</>;
};

export default UserInfoProvider;
