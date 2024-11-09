import { Inter } from "next/font/google";
import "./globals.css";
import ClientLocalizationProvider from "./utils/ClientLocalizationProviderProps ";
import ClientThemProvider from "./utils/ClientThemProvider";

const inter = Inter({ subsets: ["latin"], style: ["normal", "italic"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased `}>
        <nav className="pl-[90px] py-6 bg-gray-10 text-h6 font-semibold">
          EASYRICE TEST
        </nav>
        <ClientThemProvider>
          <ClientLocalizationProvider>
            <main className="min-h-dvh bg-[#f8f8f8] ">
              <div className="max-w-screen-2xl mx-auto">{children}</div>
            </main>
          </ClientLocalizationProvider>
        </ClientThemProvider>
      </body>
    </html>
  );
}
