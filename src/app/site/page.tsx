import ContactForm from "@/components/ContactForm";
import SubscriptionForm from "@/components/SubscriptionForm";
import Image from "next/image";
import Link from "next/link";
import Hero from "../_components/Hero";

function HomePage() {
  return (
    <>
      <Hero />

      <div className="mx-auto max-w-2xl lg:max-w-4xl">
        <h2 className="text-muted-foreground mx-5 font-sans font-bold uppercase md:mx-0">
          Events
        </h2>
      </div>

      <SubscriptionForm />

      <div>
        <ContactForm />
        <Link href="/redeeming-heartache">
          <Image
            src="/images/redeeming-banner.jpg"
            alt="Redeeming Heartache"
            width={1920}
            height={1080}
            className="w-full"
          />
        </Link>
      </div>
    </>
  );
}

export default HomePage;
