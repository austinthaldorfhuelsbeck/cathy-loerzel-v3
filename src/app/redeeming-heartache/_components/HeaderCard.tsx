import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

import sampleWellspring from "../../../../public/images/redeeming-sample-wellspring.jpg";

const HeaderCard = () => {
  return (
    <Card className="mx-auto rounded-none border-none bg-gradient-to-b from-card to-background shadow-none">
      <CardHeader>
        <CardTitle className="text-xl uppercase tracking-wider text-muted-foreground">
          Redeeming Heartache
        </CardTitle>
        <Separator />
        <CardDescription className="font-sans text-4xl font-bold uppercase text-primary">
          Your past pain does not dictate your life.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex w-full flex-col items-center gap-5 sm:flex-row-reverse">
        <div className="flex-1">
          <Image
            src={sampleWellspring}
            alt="Redeeming Heartache"
            className="rounded-lg object-cover shadow-lg"
          />
        </div>
        <div className="flex-1 space-y-5 text-xl text-muted-foreground">
          <p>
            Find freedom and healing from painful memories and relational
            struggles. Learn how your past has uniquely prepared you to
            experience more joy.
          </p>
          <p>
            <strong className="text-primary">
              Answer the call <em>to healing</em>
            </strong>{" "}
            <br />
            and discover your life&#39;s beautiful story and a future of{" "}
            <strong>hope and freedom</strong>.
          </p>
          <div className="flex gap-5">
            <Link
              href="https://www.zondervan.com/p/redeeming-heartache"
              target="_blank"
              className="flex-1"
            >
              <Button className="w-full">Order Now</Button>
            </Link>
            <Link
              href="https://d3iqwsql9z4qvn.cloudfront.net/wp-content/uploads/sites/2/2021/06/09173204/Redeeming-Heartache_Sample.pdf"
              target="_blank"
              className="flex-1"
            >
              <Button className="w-full" variant="outline">
                Free Sample
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HeaderCard;
