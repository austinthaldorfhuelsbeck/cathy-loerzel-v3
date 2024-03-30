import Navigation from "./_components/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navigation />
      <div className="flex flex-col gap-3 p-3 font-sans">{children}</div>
    </>
  );
}
