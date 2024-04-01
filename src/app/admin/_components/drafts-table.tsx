import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { capitalize } from "@/lib/utils";
import { type Event, type Post } from "@prisma/client";
import { format } from "date-fns";
import { FilePenLineIcon } from "lucide-react";
import Link from "next/link";

function DraftsTableRow({
  draft,
  type,
}: {
  draft: Post | Event;
  type: "post" | "event";
}) {
  return (
    <TableRow className="hover:bg-primary/20">
      <TableCell className="flex items-center gap-2 font-medium">
        <Link
          className="hover:underline"
          href={`/admin/${type}s/edit?id=${draft.id}`}
        >
          <span>{draft.name}</span>
        </Link>
        <FilePenLineIcon width={15} height={15} />
      </TableCell>
      <TableCell>{capitalize(type)}</TableCell>
      <TableCell>{format(draft.createdAt, "PPP")}</TableCell>
      <TableCell>{format(draft.updatedAt, "PPP")}</TableCell>
    </TableRow>
  );
}

export function DraftsTable({
  postDrafts,
  eventDrafts,
}: {
  postDrafts: Post[];
  eventDrafts: Event[];
}) {
  return (
    <Card>
      <CardHeader className="p-3">
        <CardTitle>Drafts</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Updated</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {postDrafts.map((draft) => (
              <DraftsTableRow key={draft.id} draft={draft} type="post" />
            ))}
            {eventDrafts.map((draft) => (
              <DraftsTableRow key={draft.id} draft={draft} type="event" />
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
