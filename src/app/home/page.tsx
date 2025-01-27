import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/trpc/server";
import { type EventWithData } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { CategoryCards } from "../_components/category-cards";
import ContactForm from "../_components/contact-form";
import SubFooter from "../_components/sub-footer";
import EventCard from "../events/event-card";
import Hero from "./_components/Hero";
import NewsletterForm from "./_components/custom-form";

export default async function HomePage() {
  const upcomingEvents = await api.events.getUpcomingPublished();
  const categories = await api.categories.getAllEventCategories();

  return (
    <>
      <Hero />
      <NewsletterForm />
      {upcomingEvents ? (
        <div className="mx-auto max-w-2xl lg:max-w-4xl">
          {upcomingEvents.length !== 0 && (
            <section className="flex flex-col gap-5">
              <h2 className="mx-5 font-sans font-bold uppercase text-muted-foreground md:mx-0">
                Upcoming
              </h2>
              {upcomingEvents.map((event) => (
                <EventCard key={event.id} event={event as EventWithData} />
              ))}
            </section>
          )}
        </div>
      ) : (
        <Skeleton className="h-96 w-full" />
      )}
      <div className="mx-auto max-w-2xl lg:max-w-4xl">
        {!categories && (
          <div className="flex h-24 w-full gap-5 md:h-36">
            <Skeleton className="w-36 md:w-72" />
            <Skeleton className="w-36 md:w-72" />
            <Skeleton className="w-36 md:w-72" />
          </div>
        )}
        {categories && <CategoryCards categories={categories} />}
      </div>
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
