import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="my-32 flex w-full flex-col items-center justify-center gap-10">
      <Image src={"/not-found.svg"} width={404} height={404} alt="404" />
      <h1 className="text-primary text-2xl font-bold">
        Hmm... looks like that page is not here.
      </h1>
      <Link href="/">
        <Button variant="link" className="flex-row gap-1">
          <ArrowLeftIcon size={16} />
          <p>Go back home</p>
        </Button>
      </Link>
    </div>
  );
}
