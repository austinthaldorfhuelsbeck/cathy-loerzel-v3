import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { type EventWithData } from "@/types";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";

export function EventContent({ event }: { event: Partial<EventWithData> }) {
  return (
    <>
      <Card className="flex flex-col rounded-none border-0 border-b-8 bg-background shadow-none md:flex-row">
        <div className="flex-1">
          {/* Tag Links */}
          <div className="flex gap-3">
            {event.tags?.map((tag) => (
              <Link href={`/events?tag=${tag.slug}`} key={tag.id}>
                <Button
                  variant="outline"
                  className="rounded-full"
                  style={{ backgroundColor: tag.color }}
                >
                  {tag.name}
                </Button>
              </Link>
            ))}
          </div>

          <CardHeader className="flex h-full flex-col justify-center p-3 pb-10">
            <CardTitle>{event.name}</CardTitle>
            {event.date && (
              <time className="text-muted-foreground">
                {format(event.date, "PPP")} • {event.location}
              </time>
            )}
          </CardHeader>
        </div>

        <div className="flex-1">
          <Image
            src={event.imageUrl ?? "/images/Abstract-2.jpg"}
            alt={event.name ?? "This event"}
            width={1920}
            height={1080}
            className="my-2 aspect-video border-primary object-cover object-right-top md:rounded-r md:border-l-4"
          />
        </div>
      </Card>

      <Breadcrumb className="mx-auto text-center">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/events">Events</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/events/${event?.slug}`}>
              {event?.name}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="border-none bg-background shadow-none">
        {event?.content && (
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: event.content }}
          />
        )}
      </div>
    </>
  );
}
