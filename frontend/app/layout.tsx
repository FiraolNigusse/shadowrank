import type { Metadata } from "next";
import { Orbitron, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import ClientLayout from "./components/ClientLayout";
import Nav from "./components/Nav";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
});
const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ShadowRank | Competitive Mafia",
  description: "The ultimate competitive Mafia experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.className} ${orbitron.variable} ${geistMono.variable} antialiased min-h-screen bg-[var(--bg-base)]`}
      >
        <ClientLayout>
          <Nav />
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}