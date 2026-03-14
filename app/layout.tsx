import type { Metadata, Viewport } from "next";
import { Tajawal } from "next/font/google";
import "./globals.css";

const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["300", "400", "700", "800"],
  variable: "--font-tajawal",
});

export const metadata: Metadata = {
  title: "Geoconsult AI — منصة استشارات جغرافية ذكية",
  description:
    "منصة استشارات جغرافية ذكية مدعومة بالذكاء الاصطناعي - الرياض، المملكة العربية السعودية",
};

export const viewport: Viewport = {
  themeColor: "#060d1a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={tajawal.className}>{children}</body>
    </html>
  );
}
