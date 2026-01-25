import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { AuthProvider } from '@/app/context/AuthContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Cosplayer Wardrobe',
  description: 'Find your next cosplay costume!',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#1E1E1E] text-white flex flex-col min-h-screen`}>
        <AuthProvider>
          <Navbar />
          <main className="container mx-auto py-8 px-4 flex-grow">
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}