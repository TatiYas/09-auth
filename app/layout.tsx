import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import AuthProvider from  '../components/AuthProvider/AuthProvider'

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
weight: ['400', '700'],
display: 'swap',
});


export const metadata: Metadata = {
  title: "Authenticated",
  description: "NoteHub App.",
  openGraph: {
    title: "NoteHub Auth",
    description: "NoteHub Application Optimisation with React Query and Zustand",
    url: "https://09-auth-1vfd.vercel.app/",
    siteName: "NoteHub",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
 <html lang="en">
 <body className={roboto.variable} suppressHydrationWarning>
 <TanStackProvider>
 <Header />
 {children}
 {modal}
 <Footer />
 </TanStackProvider>
 </body>
 </html>
)

}




/**import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import AuthProvider from "@/components/AuthProvider/AuthProvider";
/* import AuthNavigation from "@/components/AuthNavigation/AuthNavigation"; 

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NoteHub",
  description: "Application for create, edit and search notes.",
  openGraph: {
    title: "NoteHub — modern notes manager",
    description:
      "Create, edit, and save notes online. A lightweight, fast, and convenient React application.",
    url: "https://your-domain.com",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub preview",
      },
    ],
  },
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable}`}>
        <TanStackProvider>
          <AuthProvider>
            <Header />
            <main>{children}</main>
            {modal}
            <Footer />
          </AuthProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}*/