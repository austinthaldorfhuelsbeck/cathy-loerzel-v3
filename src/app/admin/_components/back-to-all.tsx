import { pluralize } from "@/lib/utils";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

export function BackToAll({
  type,
}: {
  type: "post" | "tag" | "category" | "event";
}) {
  return (
    <h2 className="flex items-center gap-2 text-primary">
      <ArrowLeftIcon size={16} />
      <Link
        href={`/admin/${pluralize(type)}`}
        className="text-sm font-semibold hover:underline"
      >
        Back to all {pluralize(type)}
      </Link>
    </h2>
  );
}
