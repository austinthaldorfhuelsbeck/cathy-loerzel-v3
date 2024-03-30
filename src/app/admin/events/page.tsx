import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AdminEventsPage() {
  return (
    <>
      <section className="flex justify-between">
        <h1 className="text-2xl font-bold">Events</h1>
        <Link href="/admin/events/new">
          <Button>Create Event</Button>
        </Link>
      </section>
    </>
  );
}
