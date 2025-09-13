import { ThemeProvider, Web3Provider } from '@/core/providers';
import { Header } from '@/shared/components';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { headers } from 'next/headers';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'PortaFi',
  description: 'PortaFi — a blockchain portfolio viewer.',
};

// RootLayout must be an async function to use headers()
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Retrieve cookies from request headers on the server
  const headersObj = await headers();
  const cookies = headersObj.get('cookie');

  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <Web3Provider cookies={cookies}>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            disableTransitionOnChange
            enableSystem
          >
            <Header />
            <main className="container mx-auto p-4">{children}</main>
          </ThemeProvider>
        </Web3Provider>
      </body>
    </html>
  );
}
