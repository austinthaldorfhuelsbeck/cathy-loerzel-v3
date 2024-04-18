export default async function NewPostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex items-center justify-center">
      <div className="max-w-[1200px]">{children}</div>
    </main>
  );
}
