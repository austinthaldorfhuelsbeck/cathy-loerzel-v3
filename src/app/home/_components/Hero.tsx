import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="static h-96 w-full bg-gradient-to-b from-secondary/70 to-background sm:p-10 md:pr-48 lg:h-[512px] 2xl:h-[600px]">
      <Image
        src="/images/hero.jpg"
        alt="Cathy Loerzel"
        width={1920}
        height={1080}
        objectFit="cover"
        className="h-full w-full object-cover object-top"
        quality={100}
      />
      <Card className="absolute top-64 rounded-sm border-none bg-secondary/80 text-secondary-foreground md:right-5 md:top-48 md:ml-auto md:max-w-96 xl:max-w-[480px]">
        <CardHeader>
          <CardTitle className="text-2xl font-medium tracking-wide md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl">
            Co-Founder of The Allender Center, author, speaker, and story work
            coach.
          </CardTitle>
        </CardHeader>
        <CardFooter>
          <Link
            href={"https://www.zondervan.com/p/redeeming-heartache/"}
            target="_blank"
          >
            <Button variant="link">
              <h3 className="border-b font-sans text-sm uppercase tracking-wider text-primary-foreground">
                Order &quot;Redeeming Heartache&quot; now
              </h3>
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </section>
  );
};

export default Hero;
