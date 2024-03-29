import Navigation from "@/components/Navigation";
import Footer from "../_components/Footer";

export default function SiteLayout({
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
