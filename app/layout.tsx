import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Learnly",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" style={{ height: "100%" }}>
      <ClerkProvider>
        <Providers>
          <body className={inter.className} style={{ height: "100%" }}>
            {children}
          </body>
        </Providers>
      </ClerkProvider>
    </html>
  );
}
