import Footer from "../../components/footer";
import Navigation from "../../components/navigation";

export default function PostsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navigation />
      <div className="mx-auto mt-5 flex max-w-2xl flex-col justify-center gap-10 pb-10 lg:max-w-4xl 2xl:max-w-[1400px]">
        {children}
      </div>
      <Footer />
    </>
  );
}
