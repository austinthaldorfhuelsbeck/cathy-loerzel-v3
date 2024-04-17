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

      <main className="mx-auto flex max-w-6xl flex-col gap-5 md:grid md:grid-cols-2 lg:grid-cols-3"></main>
    </>
  );
}
