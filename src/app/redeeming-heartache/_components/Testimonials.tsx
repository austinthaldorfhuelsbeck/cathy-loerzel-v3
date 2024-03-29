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

const Testimonials = () => {
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
};

export default Testimonials;
