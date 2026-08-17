import type { Metadata } from "next";
import { getClinic } from "@/lib/content";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ClinicSchema, SiteNavigationSchema } from "@/components/ClinicSchema";

const clinic = getClinic();

export const metadata: Metadata = {
  metadataBase: new URL("https://hicbergen.no"),
  title: {
    default: `${clinic.name} | ${clinic.location.city}`,
    template: `%s | ${clinic.name}`,
  },
  description: clinic.summary,
  icons: {
    icon: [
      { url: "/content/favicon/favicon_v3.ico", sizes: "any" },
      { url: "/content/favicon/favicon_v3-32.png", sizes: "32x32", type: "image/png" },
      { url: "/content/favicon/favicon_v3-96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: "/content/favicon/apple-touch-icon_v3.png",
  },
  manifest: "/content/favicon/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nb">
      <body className="min-h-screen bg-white text-gray-900 antialiased">
        <ClinicSchema />
        <SiteNavigationSchema />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
