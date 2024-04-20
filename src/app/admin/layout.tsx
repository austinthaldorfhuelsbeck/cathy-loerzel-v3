import Navigation from "./navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navigation />
      <main className="flex flex-col gap-3 p-3 font-sans">{children}</main>
    </>
  );
}
