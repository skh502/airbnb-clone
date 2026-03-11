"use client";

import { useRouter } from "next/navigation";
import MenuLink from "./navbar/MenuLink";
import { deleteAuthCookies } from "@/lib/action";
import { useUserStore } from "@/store/useUserStore";

type Props = {
  setIsOpen?: (value: boolean) => void;
};

const LogoutButton: React.FC<Props> = ({ setIsOpen }) => {
  const router = useRouter();
  const { setUser } = useUserStore();

  const submitLogout = async () => {
    setIsOpen?.(false);
    await deleteAuthCookies();
    setUser(null);
    // window.dispatchEvent(new Event("auth-change"));
    router.replace("/");
  };

  return <MenuLink label="Log out" onClick={submitLogout} />;
};

export default LogoutButton;
