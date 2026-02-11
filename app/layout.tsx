import type { Metadata } from "next";
import { getClinic } from "@/lib/content";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ClinicSchema } from "@/components/ClinicSchema";

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
      { url: "/content/favicon/favicon_v2.ico", sizes: "any" },
      { url: "/content/favicon/favicon_v2.svg", type: "image/svg+xml" },
      { url: "/content/favicon/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: "/content/favicon/apple-touch-icon_v2.png",
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
      <head>
        <link rel="icon" href="/content/favicon/favicon_v2.ico" sizes="any" />
        <link rel="icon" type="image/svg+xml" href="/content/favicon/favicon_v2.svg" />
        <link rel="apple-touch-icon" href="/content/favicon/apple-touch-icon_v2.png" />
        <link rel="manifest" href="/content/favicon/site.webmanifest" />
        <link rel="icon" type="image/png" sizes="96x96" href="/content/favicon/favicon-96x96.png" />
      </head>
      <body className="min-h-screen bg-white text-gray-900 antialiased">
        <ClinicSchema />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
