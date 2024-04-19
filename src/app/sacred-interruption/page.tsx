import { Card, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/trpc/server";
import { type EventWithData } from "@/types";
import Image from "next/image";
import Link from "next/link";
import ContentBlock from "../_components/content-block";
import SubFooter from "../_components/sub-footer";
import EventCard from "../events/event-card";
import NewsletterForm from "../home/_components/custom-form";

export default async function SacredInterruptionPage() {
  // Fetch upcoming events
  const upcomingEvents = await api.events.getUpcomingPublished();

  return (
    <>
      <div className="bg-gradient-to-b from-destructive/35 to-background">
        <ContentBlock
          title="Sacred Interruption"
          subtitle="With Cathy Loerzel, Tracy Johnson, Heather Stringer, and Christy Bauman"
        >
          <div className="flex flex-col gap-2 p-5 md:col-span-2">
            <p>
              <strong>
                Our vision is for a different type of retreat than you may have
                experienced before.
              </strong>
            </p>
            <p>
              We recognize that there is a space within us of wild and deep
              knowing that we have worked hard to forget. It is time to welcome
              that knowing and all it has to tell us about who we are, and who
              God is, back into our bodies.
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
          <Image
            src="/images/sacred-interruption.jpeg"
            alt="Serene illustration of a young woman walking through a snowy forest with a deer, bobcat, fox, sparrows, and owl."
            width={400}
            height={400}
            className="mt-5 h-full max-h-[400px] rounded-full border border-primary object-cover object-right shadow-lg"
          />
          <p className="col-span-2 md:col-span-3">
            We have known the longing for our own bodies to make space for
            authentic connection, incredible food, and beautiful spaces in which
            to rest and restore what is empty and weary within us. We have
            tasted the goodness that comes when we tend those longings.
          </p>
        </ContentBlock>

        <ContentBlock title="Fall Harvest Retreat">
          <Image
            src="/images/pie.jpeg"
            alt="A slice of pie with spices, cream, and coffee."
            width={300}
            height={300}
            className="mt-5 h-full max-h-[300px] rounded-full border border-primary object-cover object-right shadow-lg"
          />
          <p>
            Our fall retreat invites 20 women to the richness of life between
            summer and winter as we harvest the fruit and prepare for the dark
            months of winter.
          </p>
          <p>
            We will be in the beauty of the lake country in Knoxville, TN and on
            the farm with Farm to Feast.
          </p>
          <p className="md:col-span-3">
            We will take a closer look at what has been brought to life, where
            death is lurking, what needs to be harvested and what needs to be
            grieved.
          </p>
        </ContentBlock>

        <ContentBlock title="Winter Advent Retreat">
          <div className="flex flex-col gap-2 p-5 md:col-span-2">
            <p>
              You are invited to interrupt the heavy season of the holidays to
              radically embrace the fact that <strong>you need care too</strong>
              .
            </p>
            <p>
              This advent retreat is an opportunity for you to come together in
              an intimate setting at a beautiful house on a lake in Minneapolis
              where we will rest, read our bodies, and re-imagine what hope, joy
              and peace can mean for us as we slow down, feast and receive care.
            </p>
            <p>
              This is an extraordinary time to create space for the Spirit to
              speak to us, and to experience the coming of Emmanuel, God with
              us.
            </p>
          </div>
          <Image
            src="/images/pnw-winter.jpeg"
            alt="Snow falling over evergreen trees through a window."
            width={400}
            height={400}
            className="mt-5 h-full max-h-[400px] rounded-full border border-primary object-cover object-right shadow-lg"
          />
        </ContentBlock>

        <ContentBlock title="Spring Resurrection Retreat">
          <Image
            src="/images/miami-selfie.jpeg"
            alt="Cathy and a Sacred Interruption participant smiling on a sunny beach."
            width={400}
            height={400}
            className="mt-5 h-full max-h-[400px] rounded-full border border-primary object-cover object-right shadow-lg"
          />
          <div className="flex flex-col gap-2 p-5 md:row-span-2">
            <p>
              <strong>It is a wild, unruly and frenetic season</strong>.
            </p>
            <p>
              And yet, new life is often the space we understand death, fear,
              and vulnerability.
            </p>
          </div>
          <p className="col-span-2 md:col-span-1">
            Meet us on the beach in the lowlands of South Carolina as we play
            with the power of the ocean, the lull of the marsh focusing on
            stories of envy, shame, and how we have come to be at war with our
            bodies and beauty.
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
