import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <SignIn
      appearance={{
        elements: {
          formFieldInput:
            "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 text-card-foreground",
          formButtonPrimary: "bg-primary hover:bg-primary/80 text-card",
          card: "rounded-xl border bg-card shadow",
          headerTitle: "text-card-foreground",
          headerSubtitle: "text-muted-foreground",
          socialButtonsBlockButton: "border-primary/50 text-card-foreground",
          dividerLine: "bg-muted",
          dividerText: "text-muted-foreground",
          formFieldLabel: "text-muted-foreground",
          footerAction: "hidden",
        },
      }}
      afterSignInUrl="/site"
      signUpUrl="/sign-up"
    />
  );
}
