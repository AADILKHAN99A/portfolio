import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aadil Khan // Mobile & Full-Stack Engineer",
  description:
    "Portfolio of Aadil Khan — Software Engineer specializing in Flutter, cross-platform architectures, and interactive 3D WebGL experiences.",
  keywords: [
    "Aadil Khan",
    "Flutter Developer",
    "Mobile Engineer",
    "Next.js",
    "React Three Fiber",
    "Three.js",
    "Portfolio",
  ],
  authors: [{ name: "Aadil Khan", url: "https://aadilkhan.xyz" }],
  openGraph: {
    title: "Aadil Khan // Mobile & Full-Stack Engineer",
    description: "Analog Soul / Digital Mind — Interactive 3D Developer Portfolio.",
    url: "https://aadilkhan.xyz",
    siteName: "Aadil Khan Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aadil Khan // Mobile & Full-Stack Engineer",
    description: "Analog Soul / Digital Mind — Interactive 3D Developer Portfolio.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-[#080b0e] text-[#e6edf3]">
        {children}
      </body>
    </html>
  );
}
