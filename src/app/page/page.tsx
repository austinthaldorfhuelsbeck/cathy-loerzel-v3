function HomePage() {
  return (
    <div className="flex flex-col gap-5 text-lg">
      <div className="bg-background text-foreground">Test</div>
      <div className="bg-foreground text-background">Test</div>

      <div className="bg-card text-card-foreground">Test</div>
      <div className="bg-card-foreground text-card">Test</div>

      <div className="bg-popover text-popover-foreground">Test</div>
      <div className="bg-popover-foreground text-popover">Test</div>

      <div className="bg-primary text-primary-foreground">Test</div>
      <div className="bg-primary-foreground text-primary">Test</div>

      <div className="bg-secondary text-secondary-foreground">Test</div>
      <div className="bg-secondary-foreground text-secondary">Test</div>

      <div className="bg-muted text-muted-foreground">Test</div>
      <div className="bg-muted-foreground text-muted">Test</div>

      <div className="bg-accent text-accent-foreground">Test</div>
      <div className="bg-accent-foreground text-accent">Test</div>

      <div className="bg-destructive text-destructive-foreground">Test</div>
      <div className="bg-destructive-foreground text-destructive">Test</div>

      <div className="bg-border">Test</div>
      <div className="bg-input">Test</div>
      <div className="bg-ring">Test</div>
    </div>
  );
}

export default HomePage;
