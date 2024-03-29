import { type Post } from "@prisma/client";
import Link from "next/link";

const FeaturedPostBanner = (props: { post: Post }) => {
  return (
    <section>
      <h2 className="text-muted-foreground mx-5 font-sans font-bold uppercase md:mx-0">
        Featured
      </h2>
      <div
        className="relative mx-5 overflow-hidden rounded bg-cover bg-top bg-no-repeat shadow-lg md:mx-0"
        style={{ backgroundImage: `url(${props.post.imageUrl})` }}
      >
        <Link
          className="hover:bg-accent/75 bg-accent/40 flex h-64 items-center justify-center px-5 decoration-white transition-all ease-in-out hover:underline hover:backdrop-blur-sm"
          href={`/posts/${props.post.slug}`}
        >
          <h3 className="text-primary-foreground text-3xl">
            {props.post.description}
          </h3>
        </Link>
      </div>
    </section>
  );
};

export default FeaturedPostBanner;
