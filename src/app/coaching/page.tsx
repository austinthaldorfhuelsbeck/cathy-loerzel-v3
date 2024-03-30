import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/trpc/server";
import { type EventWithData } from "@/types";
import Image from "next/image";
import Link from "next/link";
import ContentBlock from "../_components/content-block";
import SubFooter from "../_components/sub-footer";
import SubscriptionForm from "../_components/subscription-form";
import EventCard from "../events/_components/event-card";

export default async function CoachingPage() {
  // Fetch upcoming events
  const upcomingEvents = await api.events.getUpcomingPublished();

  return (
    <>
      <div className="bg-gradient-to-b from-accent/25 to-background">
        <ContentBlock title="Story Work Coaching">
          <Image
            src="/images/walking-with-animals.jpg"
            alt="Serene illustration of a young woman walking through a snowy forest with a deer, bobcat, fox, sparrows, and owl."
            width={200}
            height={200}
            className="rounded-full border border-primary shadow-lg"
          />
          <div className="flex flex-col gap-2 p-5 md:col-span-2">
            <strong>Healing happens day by day.</strong>
            <p>
              In weekly StoryWork coaching sessions, we will engage your family
              of origin, trauma stories, and begin to understand where trauma is
              lodged in your body{" "}
              <em>
                <strong>and how to heal</strong>
              </em>
              .
            </p>
            <p>
              <Link
                className="underline hover:text-primary hover:decoration-primary"
                href="/#contact"
              >
                Contact Cathy
              </Link>{" "}
              to set up a 25 min consultation to see if this path is right for
              you.
            </p>
            <p>
              <em>Sliding scale pricing is available if needed.</em>
            </p>
          </div>
        </ContentBlock>

        <ContentBlock title="Leadership Coaching">
          <div className="flex flex-col gap-2 p-5 md:col-span-2">
            <strong>Take the time you need.</strong>
            <p>
              Leading an organization, being a therapist, or running groups is
              difficult work that needs care and attunement to{" "}
              <em>
                <strong>your own story</strong>
              </em>{" "}
              as you tend to others.
            </p>
            <p>
              Cathy offers coaching sessions to help you do some story work,
              understand where you are in your formational trajectory and gain
              clarity and wisdom as to your next steps in your journey toward
              wholeness.
            </p>
            <p>
              <Link
                className="underline hover:text-primary hover:decoration-primary"
                href="/#contact"
              >
                Reach out today
              </Link>
              .
            </p>
            <p>
              <em>Sliding scale pricing is available if needed.</em>
            </p>
          </div>
          <Image
            src="/images/sunset-lake.jpeg"
            alt="Sunset over a lake"
            width={400}
            height={400}
            className="mt-5 h-full max-h-[400px] rounded-full border border-primary object-cover object-right shadow-lg"
          />
        </ContentBlock>
      </div>

      {upcomingEvents ? (
        <div className="mx-auto max-w-2xl lg:max-w-4xl">
          {upcomingEvents.length !== 0 && (
            <section className="flex flex-col gap-5">
              <h2 className="mx-5 font-sans font-bold uppercase text-muted-foreground md:mx-0">
                Upcoming Events
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

      <SubscriptionForm />
      <SubFooter />
    </>
  );
}
