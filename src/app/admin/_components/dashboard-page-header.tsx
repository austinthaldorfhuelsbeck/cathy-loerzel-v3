import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function DashboardPageHeader({ type }: { type: string }) {
  const typeCapitalized = type.charAt(0).toUpperCase() + type.slice(1);

  return (
    <header className="flex justify-between">
      <h1 className="text-2xl font-bold">{`${typeCapitalized}s`}</h1>
      <Link href={`/admin/${type}s/new`}>
        <Button>{`Create ${typeCapitalized}`}</Button>
      </Link>
    </header>
  );
}
