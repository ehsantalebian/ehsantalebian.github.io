import type { Metadata } from "next";
import Preloader from "@/components/Preloader";
import Revealator from "@/components/Revealator";

export const metadata: Metadata = {
  title: { default: "Ehsan Talebian - DevOps Engineer", template: "%s - Ehsan Talebian" },
};

const stylesheets = [
  "https://fonts.googleapis.com/css?family=Poppins:400,400i,500,500i,600,600i,700,700i,800,800i,900,900i",
  "https://fonts.googleapis.com/css?family=Open+Sans:300,400,400i,600,600i,700",
  "/css/bootstrap.min.css",
  "/css/preloader.min.css",
  "/css/font-awesome.min.css",
  "/css/fm.revealator.jquery.min.css",
  "/css/style.css",
  "/css/skins/yellow.css",
  "/css/theme.css",
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {stylesheets.map((href) => (
          <link key={href} href={href} rel="stylesheet" />
        ))}
      </head>
      <body>
        <Preloader />
        <Revealator />
        {children}
      </body>
    </html>
  );
}
