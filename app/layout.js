import { Montserrat } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { SidebarProvider } from "@/context/SidebarContext";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ThemeContextProvider } from "@/context/ThemeContext";
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["200", "400", "500", "600", "700", "800", "900"],
});
export const metadata = {
  title: "DevMockupAI",
  description: "An AI-powered mockup and resume builder for developers",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <ThemeContextProvider>
        <SidebarProvider>
          <html lang="en">
            <body
              className={`${montserrat.className} flex flex-col min-h-screen`}
            >
              <Header />
              <main className="flex-grow mt-16">{children}</main>
              <Toaster />
              <Footer />
            </body>
          </html>
        </SidebarProvider>
      </ThemeContextProvider>
    </ClerkProvider>
  );
}
