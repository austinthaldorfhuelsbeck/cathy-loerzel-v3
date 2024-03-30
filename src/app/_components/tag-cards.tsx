import { type Tag } from "@prisma/client";
import Link from "next/link";

const TagCards = ({
  tags,
  type,
}: {
  tags: (Tag | undefined)[];
  type: "event" | "post";
}) => (
  <section className="mx-5 flex flex-col gap-5 sm:mx-auto sm:flex-row sm:justify-center">
    {tags.map(
      (tag) =>
        tag && (
          <Link
            href={`/${type}s?tag=${tag.slug}`}
            key={tag.id}
            className="flex flex-1 items-center justify-center rounded bg-cover text-sm text-primary-foreground transition-all ease-in-out hover:underline sm:h-[105px] sm:w-[105px] sm:rounded-full lg:h-[120px] lg:w-[120px]"
            style={{
              backgroundColor: tag.color,
            }}
          >
            <h3 className="px-4 py-2 text-center sm:p-0">{tag.name}</h3>
          </Link>
        ),
    )}
  </section>
);

export default TagCards;
