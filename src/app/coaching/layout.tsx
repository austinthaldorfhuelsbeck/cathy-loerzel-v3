import Footer from "@/components/footer";
import Navigation from "@/components/navigation";

export default function CoachingLayout({
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
