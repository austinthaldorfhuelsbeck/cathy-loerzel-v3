import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import ContactForm from "../_components/contact-form";
import ContentBlock from "../_components/content-block";
import SubFooter from "../_components/sub-footer";
import SubscriptionForm from "../_components/subscription-form";

export default function AboutPage() {
  return (
    <>
      <div className="bg-gradient-to-b from-primary/25 to-background">
        <ContentBlock title="Hi! 👋">
          <Image
            src="/images/cathy-farm.jpg"
            alt="Cathy Loerzel"
            width={400}
            height={400}
            className="mt-5 h-full max-h-[400px] rounded-full border border-primary object-cover object-right shadow-lg"
          />
          <div className="flex flex-col gap-2 p-5 md:col-span-2">
            <strong>I&#39;m Cathy.</strong>
            <p>
              I am a self diagnosed 3 on the Enneagram, a mother of 6 and 8 year
              old boys, and a wife to a mountaineer/farmer/therapist.
            </p>
            <p>
              I love dogs and horses and I come alive around water... lakes,
              oceans, rivers, creeks, swamps - you name it - I love it.
            </p>
            <p>
              My dream is to be able to have a house where I can drink coffee
              every morning looking at water.
            </p>
          </div>
        </ContentBlock>

        <ContentBlock>
          <div className="flex flex-col gap-2 p-5 md:col-span-2">
            <p>
              I received my <strong>MACP in Psychology</strong> in 2007 from{" "}
              <Link
                href="https://theseattleschool.edu"
                target="_blank"
                className="underline"
              >
                The Seattle School of Theology & Psychology
              </Link>{" "}
              and founded{" "}
              <Link
                href="https://theallendercenter.org"
                target="_blank"
                className="underline"
              >
                The Allender Center
              </Link>{" "}
              with Dan Allender in 2010.
            </p>
            <p>
              I&#39;ve spent the last 15 years developing the theory and
              methodology of a popular coaching and therapeutic approach called{" "}
              <strong>Story Work</strong>, which moves people through their past
              stories of heartache to heal and discover healthier ways of being
              in the world.
            </p>
            <p>
              In 2021, Dan and I wrote{" "}
              <Link href="/redeeming-heartache" className="underline">
                Redeeming Heartache
              </Link>
              , and it was a joy to create.
            </p>
          </div>
          <Image
            src="/images/the-seattle-school.jpg"
            alt="The Seattle School of Theology & Psychology"
            width={400}
            height={400}
            className="mt-5 h-full max-h-[400px] rounded-full border border-primary object-cover object-right shadow-lg"
          />
        </ContentBlock>

        <ContentBlock>
          <Image
            src="/images/cathy-garden.jpg"
            alt="Cathy Loerzel on the farm"
            width={400}
            height={400}
            className="mt-5 h-full max-h-[400px] rounded-full border border-primary object-cover object-right shadow-lg"
          />
          <p>
            I believe that if we are honest, we know that none of us have
            escaped heartache and trauma in this beautifully broken world. The
            question then is how we heal in order not just to make it through,
            but truly thrive in the light of all that God would hope for us.
          </p>
          <p>
            <strong>Story Work</strong> will help you understand how harm and
            heartache have come into your life and what you have done to protect
            yourself from it in both brilliant and heartbreaking ways.
          </p>
          <p className="md:col-span-3">
            It will then usher you into the radically hopeful call to remember
            your name and join God in the redemptive arc of the gospel that is
            still alive and well and wooing us to be honest, grieve, and repair
            that which has been shattered and join Jesus in breathing new life
            into this shattered world, starting with our own hearts.
          </p>
        </ContentBlock>

        <Card
          style={{ backgroundImage: `url("/images/Abstract-3.jpg")` }}
          className="m-5 max-w-3xl bg-cover bg-center p-5 text-muted-foreground md:mx-auto"
        >
          <CardContent className="flex flex-col gap-5">
            <p className="text-lg font-semibold">
              It is my utter joy and passion to join the spirit in bringing this
              work to individuals and communities.
            </p>
            <p>
              Aside from doing this work, I am passionate about cooking,
              decorating, hosting parties and nagging my family about keeping
              the house clean.
            </p>
            <p>
              I&#39;m also generally astonished by my family&#39;s capacity to
              wreak havoc on a clean house and I&#39;m bound and determined to
              raise boys who clean up after themselves. We are all a work in
              progress.
            </p>
          </CardContent>
        </Card>
      </div>

      <SubscriptionForm />
      <ContactForm />
      <SubFooter />
    </>
  );
}
