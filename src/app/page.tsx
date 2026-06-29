"use client";

import { authClient } from "@/lib/auth-client";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <button
        onClick={async () => {
          const res = await authClient.signUp.email({
  name: "Aniket",
  email: "aniket@example.com",
  password: "password123",
});

console.log("Response:", res);
console.log("Error:", res.error);
console.log("Error message:", res.error?.message);
console.log("Error code:", res.error?.code);

          console.log(res);
        }}
        className="rounded bg-black px-4 py-2 text-white"
      >
        Test Signup
      </button>
    </main>
  );
}