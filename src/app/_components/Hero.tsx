import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="from-secondary/70 to-secondary/40 static h-96 w-full bg-gradient-to-b sm:p-10 md:pr-48 lg:h-[512px] 2xl:h-[600px]">
      <Image
        src="/images/hero.jpg"
        alt="Cathy Loerzel"
        width={1920}
        height={1080}
        objectFit="cover"
        className="h-full w-full object-cover object-top"
        quality={100}
      />
      <Card className="text-secondary-foreground bg-secondary/80 absolute top-64 rounded-sm border-none md:right-5 md:top-48 md:ml-auto md:max-w-96 xl:max-w-[480px]">
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
              <h3 className="text-primary-foreground border-b font-sans text-sm uppercase tracking-wider">
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
