import { type Category } from "@prisma/client";
import Link from "next/link";

const imagePaths = [
  "/images/Abstract-1.jpg",
  "/images/Abstract-2.jpg",
  "/images/Abstract-3.jpg",
  "/images/Abstract-4.jpg",
];

const CategoryCards = (props: { categories: (Category | undefined)[] }) => (
  <section>
    <div className="mx-5 flex justify-center gap-5 md:mx-0">
      {props.categories.map(
        (category, idx) =>
          category && (
            <div
              key={idx}
              className="flex-1 rounded-sm bg-cover"
              style={{
                backgroundImage: `url(${imagePaths[idx % imagePaths.length]})`,
              }}
            >
              <Link
                href={
                  category.type === "POST"
                    ? `/posts?category=${category.slug}`
                    : `/events?category=${category.slug}`
                }
                className="block h-full rounded-sm bg-secondary/20 px-4 py-2 text-lg text-primary-foreground transition-all ease-in-out hover:bg-secondary/65 hover:underline sm:px-8 sm:py-6"
              >
                <h3 className="text-xl">{category.name}</h3>
                <p className="hidden text-sm italic md:inline-block">
                  <em>{category.subtitle}</em>
                </p>
              </Link>
            </div>
          ),
      )}
    </div>
  </section>
);

export default CategoryCards;
