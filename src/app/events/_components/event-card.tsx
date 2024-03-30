import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { shorten } from "@/lib/utils";
import { type EventWithData } from "@/types";
import Image from "next/image";
import Link from "next/link";

export default function EventCard({ event }: { event: EventWithData }) {
  return (
    <Card className="mx-5 flex max-h-56 md:w-full">
      <Link
        href={`/events/${event.slug}`}
        className="flex-1 border-r-8 border-primary p-0"
        style={{
          borderColor: event.tags[0]?.color ?? "primary",
        }}
      >
        <Image
          src={event.imageUrl ?? "/images/Abstract-4.jpg"}
          alt={event.name}
          width={300}
          height={200}
          className="aspect-video h-full w-full rounded-l-lg object-cover hover:brightness-90"
        />
      </Link>

      <CardContent className="flex flex-1 flex-col justify-center gap-3 p-5">
        <Link href={`/events/${event.slug}`}>
          <CardTitle className="font-bold text-primary underline">
            {event.name}
          </CardTitle>
        </Link>

        <p>
          {event.date.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
          {" | "}
          {event.location}
        </p>

        <Link href={`/events/${event.slug}`}>
          <p className="hidden hover:underline md:inline-block">
            {shorten(event.description, 30)}
          </p>
        </Link>
      </CardContent>
    </Card>
  );
}
