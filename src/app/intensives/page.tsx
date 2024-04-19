import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/trpc/server";
import { type EventWithData } from "@/types";
import Image from "next/image";
import Link from "next/link";
import ContentBlock from "../_components/content-block";
import SubFooter from "../_components/sub-footer";
import EventCard from "../events/event-card";
import NewsletterForm from "../home/_components/custom-form";

export default async function IntensivesPage() {
  // Fetch upcoming events
  const upcomingEvents = await api.events.getUpcomingPublished();

  return (
    <>
      <div className="bg-gradient-to-b from-card/25 to-background">
        <ContentBlock title="Story Work Intensives">
          <Image
            src="/images/retreat-conversation.jpeg"
            alt="Serene illustration of a young woman walking through a snowy forest with a deer, bobcat, fox, sparrows, and owl."
            width={400}
            height={400}
            className="mt-5 h-full max-h-[400px] rounded-full border border-primary object-cover object-right shadow-lg"
          />
          <div className="flex flex-col gap-2 p-5 md:col-span-2">
            <p>
              Each of us have origin stories that shape how we operate in our
              day to day lives and without an understanding of these stories -
              they will subconsciously lead our lives.
            </p>
            <p>
              There are reasons we feel anxious, disconnected, depressed, sad,
              or fearful, and those reasons reside in your stories of childhood
              harm and heartache.
            </p>
            <p>
              <Link
                className="underline hover:text-primary hover:decoration-primary"
                href="/#contact"
              >
                Contact Cathy
              </Link>{" "}
              to set up a consultation to see if this path is right for you.
            </p>
          </div>
          <p className="col-span-2 md:col-span-3">
            <strong>None of us can escape harm</strong> and we have all adjusted
            our ways of relating in order to negotiate the difference between
            what we were meant for and what we encounter.
          </p>
        </ContentBlock>

        <Card
          style={{ backgroundImage: `url("/images/Abstract-4.jpg")` }}
          className="m-5 max-w-3xl bg-cover bg-center p-5 text-muted-foreground md:mx-auto"
        >
          <CardContent className="flex flex-col gap-5">
            <p>
              Each life can be understood and healed - we just have to be brave
              enough to listen to what our bodies know but our minds are
              catching up to.
            </p>
            <p>
              <strong>Story Work Intensives</strong> offer a space to
              intentionally deep dive into your stories of heartache and trauma.
            </p>
            <p>
              Engaging your stories will help us understand more of your family
              of origin and its link to where you are struggling to find
              freedom, joy and connection in the present.
            </p>
            <p>
              <Link
                className="underline hover:text-primary hover:decoration-primary"
                href="/#contact"
              >
                Reach out today
              </Link>
              .
            </p>{" "}
          </CardContent>
        </Card>

        <ContentBlock title="Group Intensives">
          <Image
            src="/images/cathy-garden.jpg"
            alt="Cathy Loerzel on the farm"
            width={300}
            height={300}
            className="mt-5 h-full max-h-[300px] rounded-full border border-primary object-cover object-right shadow-lg"
          />
          <p>
            <strong>
              Some of the most profound healing occurs in community.
            </strong>
            <br />
            Story Work Group Intensives offer a chance to gather with other
            people and lean into our stories collectively as well as
            individually.
          </p>
          <p>
            Each participant is invited to share one story and will receive
            engagement on that story from Cathy and the group.
          </p>
          <p className="md:col-span-3">
            Sessions are three days long, with five participants per group.
            Includes one session of follow-up care.
          </p>
        </ContentBlock>

        <ContentBlock title="Individual Intensives">
          <div className="flex flex-col gap-2 p-5 md:col-span-2">
            <p>
              Designed to offer you <strong>one on one space</strong> to engage
              two stories with the gift of <strong>uninterrupted time</strong>.
            </p>
            <p>
              This will be a sacred time to focus into your past pain and begin
              to understand where you are stuck and how to heal from your past
              heartache.
            </p>
            <p>
              Individual intensives are also available for couples who are
              looking to deepen their connection and understanding of each
              other.
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

        <ContentBlock title="Body and Soul Intensives">
          <Image
            src="/images/walking-with-animals.jpg"
            alt="Serene illustration of a young woman walking through a snowy forest with a deer, bobcat, fox, sparrows, and owl."
            width={400}
            height={400}
            className="mt-5 h-full max-h-[400px] rounded-full border border-primary object-cover object-right shadow-lg"
          />
          <div className="flex flex-col gap-2 p-5 md:row-span-2">
            <p>
              <strong>Work with your whole body</strong> and integrate the
              places in your story where you need coordinated care.
            </p>
            <p>
              We will work alongside a trusted body practitioner who will listen
              to your body and help you connect to the unknown.
            </p>
          </div>
          <p className="col-span-2 md:col-span-1">
            Through this work, we will help you understand the places in your
            body where trauma is stored and how to begin to heal and reconnect
            your body, soul, and spirit.
          </p>
        </ContentBlock>
      </div>

      <Card
        style={{
          backgroundImage: `url("/images/retreat-conversation.jpeg")`,
        }}
        className="mx-5 aspect-video rounded-lg bg-cover bg-center shadow-lg backdrop-blur-sm 2xl:mx-auto 2xl:w-[1500px]"
      >
        <Link
          href="/#contact"
          className="flex h-full w-full flex-col items-center justify-center rounded-lg bg-accent/40 px-5 text-primary-foreground decoration-white backdrop-blur-sm transition-all ease-in-out hover:bg-accent/75 hover:underline hover:backdrop-blur-md"
        >
          <CardTitle className="font-sans font-bold uppercase">
            <p className="font-sans uppercase text-white">Don&#39;t wait.</p>
            <p className="text-4xl">Reach out today.</p>
          </CardTitle>
        </Link>
      </Card>

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

      <NewsletterForm />
      <SubFooter />
    </>
  );
}
