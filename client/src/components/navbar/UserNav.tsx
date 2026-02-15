"use client";
import { useEffect, useRef, useState } from "react";

import MenuLink from "./MenuLink";
import useLoginModal from "@/hooks/useLoginModal";
import useSignupModal from "@/hooks/useSignupModal";
import LogoutButton from "../LogoutButton";
import { CircleUser } from "lucide-react";
import { useUserStore } from "@/store/useUserStore";
import { useRouter } from "next/navigation";

type Props = {
  userId: string | null;
};

const UserNav = ({ userId }: Props) => {
  const loginModal = useLoginModal();
  const signupModal = useSignupModal();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user } = useUserStore();

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen]);

  return (
    <div
      ref={dropdownRef}
      className="p-2 relative inline-block border rounded-full cursor-pointer"
    >
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center cursor-pointer"
      >
        <svg
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>

        <svg
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="w-[220px] absolute top-[105%] right-0 bg-white border border-red-300 rounded-xl shadow-md flex flex-col cursor-pointer z-12 overflow-hidden">
          {userId ? (
            <div className="flex flex-col overflow-hidden">
              <p className="flex gap-2 items-center capitalize px-5 py-3 border-b border-airbnb text-black/80 cursor-default">
                <CircleUser className="w-5 h-5" />
                <span className="text-[1.18rem]">{user?.name}</span>
              </p>
              <MenuLink
                label="My Properties"
                onClick={() => {
                  setIsOpen(false);
                  router.push("/myproperties");
                }}
              />
              <MenuLink
                label="My Reservations"
                onClick={() => {
                  setIsOpen(false);
                  router.push("/myreservations");
                }}
              />
              <LogoutButton setIsOpen={setIsOpen} />
            </div>
          ) : (
            <>
              <MenuLink
                label="Log in"
                onClick={() => {
                  setIsOpen(false);
                  loginModal.open();
                }}
              />

              <MenuLink
                label="Sign up"
                onClick={() => {
                  setIsOpen(false);
                  signupModal.open();
                }}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default UserNav;
