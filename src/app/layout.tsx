import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";
import { ClientLayout } from "@/components/client-layout";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: 'GDG AOU',
  description: 'GDG AOU - Your Academic Resource Hub',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <ClientLayout>
        <Providers>
          <body className="min-h-screen bg-background font-sans antialiased">
            {children}
            <Toaster />
          </body>
        </Providers>
      </ClientLayout>
    </html>
  )
}