import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import type { Category, Tag } from "@prisma/client";

export function EventsPageHeader({
  eventCategory,
  eventTag,
  category,
  tag,
}: {
  eventCategory?: Partial<Category>;
  eventTag?: Partial<Tag>;
  category?: string;
  tag?: string;
}) {
  return (
    <header className="flex flex-col items-center justify-center gap-5">
      <h1 className="text-center text-3xl font-semibold text-muted-foreground">
        {eventCategory?.name ?? eventTag?.name ?? "All Events"}
      </h1>
      <p className="text-center text-xl text-muted-foreground">
        {eventCategory?.description ??
          eventTag?.description ??
          "Catch Cathy at a speaking engagement near you, join a virtual event, or attend an intensive or retreat."}
      </p>
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/events`}>Events</BreadcrumbLink>
          </BreadcrumbItem>
          {category && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink
                  href={`/events?category=${category.toString()}`}
                >
                  {eventCategory?.name}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </>
          )}
          {tag && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href={`/events?tag=${tag.toString()}`}>
                  {eventTag?.name}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </>
          )}
        </BreadcrumbList>
      </Breadcrumb>
    </header>
  );
}
