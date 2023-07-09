import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./global.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Flashcards APP",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ClerkProvider>
        <body className={inter.className}>{children}</body>
      </ClerkProvider>
    </html>
  );
}
