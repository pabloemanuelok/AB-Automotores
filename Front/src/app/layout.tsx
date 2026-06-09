import type { Metadata } from "next";
import "./globals.css";
import { Titillium_Web } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import Navbar from "@/Components/Navbar/Navbar";
import Footer from "@/Components/Footer/Footer";
import { UserProvider } from "@/Context/contextUser";
import FloatingWhatsApp from "@/Components/FloatingWsp/FloatingWsp";
import PageviewTracker from "@/Components/PageviewTracker/PageviewTracker";

const titillium = Titillium_Web({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AB Automotores",
  description: "Concesionaria de autos usados en Argentina. Encontrá tu próximo auto en AB Automotores.",
  verification: {
    google: "Yd1UBzKAw9uI1TwNli-SL61tUJpgk_sNYf8ZyZWmCm0",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "192x192" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${titillium.className} flex flex-col min-h-screen antialiased`}>
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID!} />
        <UserProvider>
          <PageviewTracker />
          <Navbar />
          <main className="flex-grow">{children}</main>
          <FloatingWhatsApp />
          <Footer />
        </UserProvider>
      </body>
    </html>
  );
}
