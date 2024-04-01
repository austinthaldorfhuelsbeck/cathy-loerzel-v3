import Footer from "@/app/_components/footer";
import Navigation from "@/app/_components/navigation";

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navigation />
      <div className="flex flex-col justify-center gap-10 pb-10">
        {children}
      </div>
      <Footer />
    </>
  );
}
