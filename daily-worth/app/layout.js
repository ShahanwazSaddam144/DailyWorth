import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Daily Worth - Master Financial Literacy",
  description: "Innovative platform for financial literacy and economic awareness. Learn money management, track expenses, and achieve financial independence.",
  keywords: "financial literacy, economics, money management, financial education, financial independence",
  icons:{
    icon:'/butt.png'
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900`}
      >
        {children}
      </body>
    </html>
  );
}
