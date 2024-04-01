import Image from "next/image";
import ContentBlock from "../_components/content-block";
import SubFooter from "../_components/sub-footer";
import HeaderCard from "./_components/header-card";

import sampleContents from "../../../public/images/redeeming-sample-contents.jpg";
import stillLife from "../../../public/images/redeeming-still-life.jpg";
import NewsletterForm from "../home/_components/custom-form";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";
import { testimonials } from "@/lib/consts";
import { QuoteIcon } from "lucide-react";
import Link from "next/link";

const imagePaths = [
  "/images/Abstract-1.jpg",
  "/images/Abstract-2.jpg",
  "/images/Abstract-3.jpg",
  "/images/Abstract-4.jpg",
];

function Testimonials() {
  return (
    <Card className="mx-auto max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-4xl">
      <CardHeader>
        <CardTitle className="text-lg font-light uppercase tracking-wider text-muted-foreground">
          Praise for
        </CardTitle>
        <Separator />
        <CardDescription className="font-sans text-4xl font-bold uppercase text-primary">
          Redeeming Heartache
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Carousel>
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Card
                    style={{
                      backgroundImage: `url(${
                        imagePaths[index % imagePaths.length]
                      })`,
                    }}
                    className="rounded-lg bg-cover bg-center"
                  >
                    <CardContent className="flex aspect-video items-center justify-center p-6">
                      <div className="rounded bg-background/50 p-5 text-center">
                        <QuoteIcon className="h-8 w-8 rotate-180 text-primary opacity-75" />
                        <p className="text-lg text-muted-foreground">
                          {testimonial.quote}
                        </p>
                        <QuoteIcon className="ml-auto h-8 w-8 text-primary opacity-75" />
                        <p className="text-lg text-muted-foreground">
                          <strong>{`—${testimonial.author}`}</strong>
                        </p>
                        <p className="font-sans text-xs uppercase tracking-wider text-muted-foreground">
                          {testimonial.title}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:inline-block" />
          <CarouselNext className="hidden md:inline-block" />
        </Carousel>
      </CardContent>

      <CardFooter className="flex flex-col items-start text-lg text-muted-foreground">
        <p>
          <strong>
            <em>Answer the call to healing</em>.
          </strong>
        </p>
        <p>
          Don&#39;t wait.{" "}
          <Link
            href="https://www.zondervan.com/p/redeeming-heartache"
            target="_blank"
            className="font-semibold text-primary underline"
          >
            Order today
          </Link>
          .
        </p>
      </CardFooter>
    </Card>
  );
}

export default async function RedeemingHeartachePage() {
  return (
    <>
      <HeaderCard />

      <video
        src="https://cathyloerzel.s3.us-west-2.amazonaws.com/Behind+the+Book_+Redeeming+Heartache.mp4"
        className="mx-5 rounded-lg shadow md:mx-auto md:max-w-2xl"
        controls
      />
      <Testimonials />

      <ContentBlock>
        <p>
          With a clear, biblically trustworthy method, Allender and Loerzel walk
          you through a journey of profound inner transformation—from the shame
          and hurt of old emotional wounds to true freedom and healing.
        </p>
        <p>
          Drawn from modern research and their pioneering work at The Allender
          Center, they will help you identify your core trauma in one of the
          three outcast archetypes—the widow, orphan, or stranger—and chart your
          path of growth into the God-given roles of{" "}
          <strong>priest, prophet, or leader</strong>.
        </p>
        <Image
          src={stillLife}
          alt="Redeeming Heartache Cover"
          placeholder="blur"
          className="aspect-video w-full rounded-full border border-primary object-cover shadow-lg sm:col-span-2 md:col-span-1 md:h-full lg:mt-5 lg:h-[350px]"
        />
      </ContentBlock>

      <Card className="mx-5 p-5 text-muted-foreground lg:mx-auto lg:w-[900px]">
        <CardHeader>
          <CardTitle className="font-sans text-4xl font-bold uppercase text-primary">
            Listen to a Sample
          </CardTitle>
          <p className="text-primary">of the audiobook:</p>
        </CardHeader>
        <iframe
          width="100%"
          height="166"
          title="Redeeming Heartache Sample"
          src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1097217604&color=%23b57a47&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"
          className="w-full"
        />
        <div className="ml-auto mt-5 text-right font-sans text-xs uppercase tracking-wider">
          <Link
            href="https://soundcloud.com/harperaudio_us"
            title="HarperAudio US"
            target="_blank"
            className="decoration-none"
            rel="noreferrer"
          >
            HarperAudio US
          </Link>
          <a
            href="https://soundcloud.com/harperaudio_us/redeeming-heartache-by-dan-b-allender-pllc-and-cathy-loerzel-chapter-one"
            title="REDEEMING HEARTACHE by Dan B. Allender PLLC and Cathy Loerzel | Chapter One"
            target="_blank"
            className="decoration-none font-bold"
            rel="noreferrer"
          >
            <p className="text-primary">
              REDEEMING HEARTACHE by Dan B. Allender PLLC and Cathy Loerzel
            </p>
            Chapter One
          </a>
        </div>
      </Card>

      <ContentBlock>
        <Image
          src={sampleContents}
          alt="Redeeming Heartache Sample"
          placeholder="blur"
          className="aspect-video w-full rounded-full border border-primary object-cover shadow-lg sm:col-span-2 md:col-span-1 md:h-full lg:mt-5 lg:h-[350px]"
        />
        <strong>
          Find freedom and healing from painful memories and relational
          struggles and learn how your past has uniquely prepared you to
          experience more joy.
        </strong>
        <div>
          <h3 className="my-5 font-sans text-xl font-bold uppercase text-primary">
            This book will help you learn:
          </h3>
          <ul className="space-y-3 font-sans text-sm font-semibold tracking-wider text-primary">
            <li>What to do about feeling out-of-place and directionless</li>
            <li>How your coping mechanisms create a false sense of health</li>
            <li>
              How to embrace your divine calling and find lasting reconciliation
            </li>
            <li>
              How your heart wounds are your unique invitation to true strength
              and purpose.
            </li>
            <li className="list-none text-right font-sans text-xs font-bold uppercase tracking-wider text-primary">
              And more!
            </li>
          </ul>
        </div>
      </ContentBlock>

      <Card
        style={{
          backgroundImage: `url("/images/redeeming-sample-spine.jpg")`,
        }}
        className="mx-5 aspect-video rounded-lg bg-cover bg-center shadow-lg backdrop-blur-sm 2xl:mx-auto 2xl:w-[1500px]"
      >
        <Link
          href="https://www.zondervan.com/p/redeeming-heartache"
          target="_blank"
          className="flex h-full w-full flex-col items-center justify-center rounded-lg bg-accent/40 px-5 text-primary-foreground decoration-white backdrop-blur-sm transition-all ease-in-out hover:bg-accent/75 hover:underline hover:backdrop-blur-md"
        >
          <CardTitle className="font-sans font-bold uppercase">
            <p className="font-sans uppercase text-white">Don&#39;t wait.</p>
            <p className="text-4xl">Order your copy today.</p>
          </CardTitle>
        </Link>
      </Card>

      <NewsletterForm />

      <SubFooter />
    </>
  );
}
