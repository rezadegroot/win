import { Inter, Manrope } from "next/font/google";
import "../globals.css";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-headline",
});

export { metadata } from "./metadata";

export default function FrontendLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="nl"
      className={`${inter.variable} ${manrope.variable} scroll-smooth`}
    >
      <body className="min-h-screen flex flex-col antialiased">
        <a href="#inhoud" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-win-navy focus:px-4 focus:py-3 focus:text-white">
          Ga naar inhoud
        </a>
        <Navigation />
        <main id="inhoud" tabIndex={-1} className="flex-1 pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
