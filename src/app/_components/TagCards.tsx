import { type Tag } from "@prisma/client";

const TagCards = (props: { tags: (Tag | undefined)[] }) => (
  <section className="mx-5 flex flex-col gap-5 sm:mx-auto sm:flex-row sm:justify-center">
    {props.tags.map(
      (tag) =>
        tag && (
          <a
            href={`/posts?tag=${tag.slug}`}
            key={tag.id}
            className="text-primary-foreground flex flex-1 items-center justify-center rounded bg-cover text-sm transition-all ease-in-out hover:underline sm:h-[105px] sm:w-[105px] sm:rounded-full lg:h-[120px] lg:w-[120px]"
            style={{
              backgroundColor: tag.color,
            }}
          >
            <h3 className="px-4 py-2 text-center sm:p-0">{tag.name}</h3>
          </a>
        ),
    )}
  </section>
);

export default TagCards;
