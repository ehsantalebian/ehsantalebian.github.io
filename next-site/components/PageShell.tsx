import Header from "./Header";

/**
 * The theme's CSS keys off a `home` / `about` / `contact` class on <body>.
 * In the App Router <body> lives in the root layout, so each page gets the
 * class on a wrapper element instead (all selectors are descendant selectors).
 */
export default function PageShell({
  page,
  children,
}: {
  page: "home" | "about" | "contact" | "chat";
  children: React.ReactNode;
}) {
  return (
    <div className={page}>
      <Header />
      {children}
    </div>
  );
}
