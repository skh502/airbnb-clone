"use client";

import { useRouter } from "next/navigation";
import MenuLink from "./navbar/MenuLink";
import { deleteAuthCookies } from "@/lib/action";

type Props = {
  setIsOpen?: (value: boolean) => void;
};

const LogoutButton: React.FC<Props> = ({ setIsOpen }) => {
  const router = useRouter();

  const submitLogout = async () => {
    setIsOpen?.(false);
    deleteAuthCookies();
    router.push("/");
  };

  return <MenuLink label="Log out" onClick={submitLogout} />;
};

export default LogoutButton;
