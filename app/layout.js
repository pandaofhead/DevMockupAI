import { Montserrat } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const montserrat
 = Montserrat({
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
      <html lang="en">
        <body className={montserrat.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
