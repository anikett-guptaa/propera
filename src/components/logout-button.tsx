"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await authClient.signOut();

    router.replace("/sign-in");
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      className="mt-5 rounded bg-red-600 px-4 py-2 text-white"
    >
      Logout
    </button>
  );
}