"use server";
import { cookies } from "next/headers";

export async function handleLogin(
  userId: string,
  accessToken: string,
  refreshToken: string,
) {
  const cookieStore = await cookies();

  cookieStore.set("session_userid", userId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // One week
    path: "/",
  });

  cookieStore.set("session_access_token", accessToken, {
    httpOnly: true,
    secure: false,
    maxAge: 60 * 60, // 60 minutes
    path: "/",
  });

  cookieStore.set("session_refresh_token", refreshToken, {
    httpOnly: true,
    secure: false,
    maxAge: 60 * 60 * 24 * 7, // One week
    path: "/",
  });
}

export async function deleteAuthCookies() {
  const cookieStore = await cookies();

  cookieStore.delete("session_userid");
  cookieStore.delete("session_access_token");
  cookieStore.delete("session_refresh_token");

  // or:
  // cookieStore.set("session_userid", "", {
  //   httpOnly: true,
  //   secure: process.env.NODE_ENV === "production",
  //   maxAge: 0, // remove immediately
  //   path: "/",
  // });

  // cookieStore.set("session_access_token", "", {
  //   httpOnly: true,
  //   secure: false,
  //   maxAge: 0,
  //   path: "/",
  // });

  // cookieStore.set("session_refresh_token", "", {
  //   httpOnly: true,
  //   secure: false,
  //   maxAge: 0,
  //   path: "/",
  // });
}

export async function handleRefresh(): Promise<string | undefined> {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("session_refresh_token")?.value;

  if (!refreshToken) return undefined;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/token/refresh/`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh: refreshToken }),
      },
    );

    if (!response.ok) {
      await deleteAuthCookies();
      return undefined;
    }

    const data = await response.json();

    // Save new access token
    cookieStore.set("session_access_token", data.access, {
      httpOnly: true,
      secure: false,
      maxAge: 60 * 60,
      path: "/",
    });

    return data.access;
  } catch {
    return undefined;
  }
}

export async function getUserId() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("session_userid")?.value;

  return userId ? userId : null;
}

export async function getAccessToken() {
  const cookieStore = await cookies();

  let accessToken = cookieStore.get("session_access_token")?.value;
  if (!accessToken) {
    accessToken = await handleRefresh();
  }
  return accessToken ?? undefined;
}
