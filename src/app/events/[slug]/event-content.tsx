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

const DEFAULT_IMAGE = "/images/Abstract-2.jpg";

const EventImage = ({
  src,
  alt,
  href,
}: {
  src: string;
  alt: string;
  href?: string;
}) => {
  const image = (
    <Image
      src={src}
      alt={alt}
      width={1920}
      height={1080}
      className="my-2 aspect-video border-primary object-cover object-right-top md:rounded-r md:border-l-4"
    />
  );

  return href ? (
    <Link href={href} target="_blank">
      {image}
    </Link>
  ) : (
    image
  );
};

export const EventContent = ({ event }: { event: Partial<EventWithData> }) => {
  const { name, href, imageUrl, tags, content, slug } = event;

  return (
    <>
      <Card className="flex flex-col rounded-none border-0 border-b-8 bg-background shadow-none md:flex-row">
        <div className="flex-1">
          {/* Tag Links */}
          <div className="flex gap-3">
            {tags?.map(({ id, slug, color, name }) => (
              <Link href={`/events?tag=${slug}`} key={id}>
                <Button
                  variant="outline"
                  className="rounded-full"
                  style={{ backgroundColor: color }}
                >
                  {name}
                </Button>
              </Link>
            ))}
          </div>

          <CardHeader className="flex h-full flex-col justify-center p-3 pb-10">
            {name && (
              <CardTitle>
                {href ? (
                  <Link href={href} target="_blank">
                    {name}
                  </Link>
                ) : (
                  name
                )}
              </CardTitle>
            )}
            {event.date && (
              <time className="text-muted-foreground">
                {format(event.date, "PPP")} • {event.location}
              </time>
            )}
          </CardHeader>
        </div>

        <div className="flex-1">
          <EventImage
            src={imageUrl ?? DEFAULT_IMAGE}
            alt={name ?? "Event"}
            href={href!}
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
            <BreadcrumbLink href={`/events/${slug}`}>{name}</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {content && (
        <div className="border-none bg-background shadow-none">
          {event.name && event.href && (
            <CardTitle className="mb-3">
              <Link href={event.href} target="_blank">
                {event.name}
              </Link>
            </CardTitle>
          )}
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      )}
    </>
  );
};
