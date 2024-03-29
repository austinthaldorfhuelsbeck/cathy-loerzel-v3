import SubscriptionForm from "@/components/SubscriptionForm";
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
    </>
  );
}

export default HomePage;
