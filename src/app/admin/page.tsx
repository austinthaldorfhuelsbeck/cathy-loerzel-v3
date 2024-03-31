"use client";

import { useUser } from "@clerk/nextjs";
import { LoadingPage } from "../_components/loading";

export default function AdminPage() {
  const { isLoaded: clerkUserIsLoaded } = useUser();

  if (!clerkUserIsLoaded) return <LoadingPage />;
  return (
    <>
      <header className="flex justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </header>

      <main>
        <section></section>
      </main>
    </>
  );
}
