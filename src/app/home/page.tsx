import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/trpc/server";
import Image from "next/image";
import Link from "next/link";
import CategoryCards from "../_components/category-cards";
import ContactForm from "../_components/contact-form";
import SubFooter from "../_components/sub-footer";
import SubscriptionForm from "../_components/subscription-form";
import Hero from "./_components/Hero";

export default async function HomePage() {
  const categories = await api.category.getAllEventCategories();

  return (
    <>
      <Hero />

      <div className="mx-auto max-w-2xl lg:max-w-4xl">
        <h2 className="mx-5 font-sans font-bold uppercase text-muted-foreground md:mx-0">
          Events
        </h2>
        {!categories && (
          <div className="flex h-24 w-full gap-5 md:h-36">
            <Skeleton className="w-36 md:w-72" />
            <Skeleton className="w-36 md:w-72" />
            <Skeleton className="w-36 md:w-72" />
          </div>
        )}
        {categories && <CategoryCards categories={categories} />}
      </div>

      <SubscriptionForm />

      <div id="contact">
        <ContactForm />
        <Link href="/redeeming-heartache">
          <Image
            src="/images/redeeming-banner.jpg"
            alt="Redeeming Heartache"
            width={1920}
            height={1080}
            className="w-full"
          />
        </Link>
      </div>

      <SubFooter />
    </>
  );
}
