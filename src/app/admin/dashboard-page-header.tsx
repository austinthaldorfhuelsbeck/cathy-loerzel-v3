import { Button } from "@/components/ui/button";
import { capitalize, pluralize } from "@/lib/utils";
import Link from "next/link";

export default function DashboardPageHeader({
  type,
  title,
}: {
  title?: string;
  type: "event" | "post" | "category" | "tag";
}) {
  return (
    <header className="flex justify-between">
      <h1 className="text-2xl font-bold">
        {title ?? capitalize(pluralize(type))}
      </h1>
      <Link href={`/admin/${pluralize(type)}/new`}>
        <Button>{`Create ${capitalize(type)}`}</Button>
      </Link>
    </header>
  );
}
