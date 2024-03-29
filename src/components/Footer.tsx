const discoverLinks = [
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Redeeming Heartache", href: "/redeeming-heartache" },
];

const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground w-full p-4">
      <p className="text-border text-xs tracking-wide">
        © {new Date().getFullYear()} Cathy Loerzel. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
