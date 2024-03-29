import Footer from "../_components/Footer";
import Navigation from "../_components/Navigation";

export default function RedeemingHeartacheLayout({
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
