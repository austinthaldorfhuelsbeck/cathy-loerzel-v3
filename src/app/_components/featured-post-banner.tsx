import { type Post } from "@prisma/client";
import Link from "next/link";

const FeaturedPostBanner = (props: { post: Post }) => {
  return (
    <section>
      <h2 className="mx-5 font-sans font-bold uppercase text-muted-foreground md:mx-0">
        Featured
      </h2>
      <div
        className="relative mx-5 overflow-hidden rounded bg-cover bg-top bg-no-repeat shadow-lg md:mx-0"
        style={{ backgroundImage: `url(${props.post.imageUrl})` }}
      >
        <Link
          className="flex h-64 items-center justify-center bg-accent/40 px-5 decoration-white transition-all ease-in-out hover:bg-accent/75 hover:underline hover:backdrop-blur-sm"
          href={`/posts/${props.post.slug}`}
        >
          <h3 className="text-3xl text-primary-foreground">
            {props.post.name}
          </h3>
        </Link>
      </div>
    </section>
  );
};

export default FeaturedPostBanner;
