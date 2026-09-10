import type { Metadata } from "next";
import "./globals.css";
import PageLoader from "@/components/PageLoader";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "MaBap Foundation | Avirat Seva Mahe — Devoted to the Seva of Humanity",
  description:
    "MaBap Foundation is a Section 8 non-profit serving humanity through Toy & Games Libraries, Digital Classrooms, medical camps and community support, guided by the teachings of Shri Shri Maha Avatar Babaji.",
  icons: {
    icon: "/assets/images/logo.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Inter:wght@400;500;600;700&family=Noto+Sans+Devanagari:wght@500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <PageLoader />
        {/*
          Belt-and-suspenders against a loader flash on a hard refresh within
          the same session: PageLoader's own effect handles this too, but that
          runs post-hydration. This runs synchronously the instant the parser
          reaches it (same trick the static site used), so there's no gap.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              'if(sessionStorage.getItem("mabap-loader-shown")==="1"){var el=document.getElementById("page-loader");if(el)el.style.display="none";}',
          }}
        />
        <Header />
        <main>{children}</main>
        <Footer />
        <ScrollReveal />
      </body>
    </html>
  );
}
