import type { Metadata } from "next";
import "./globals.css";
import ClientBody from "./ClientBody";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Inter } from "next/font/google";

// Using Inter as a close match to Cerebri Sans
const inter = Inter({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Moveek - Đặt vé phim chiếu rạp",
  description:
    "Website cộng đồng về phim, xem thông tin, đánh giá bình luận phim. Xem lịch chiếu rạp, danh sách phim mới ra mắt và các phim bom tấn sắp chiếu.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${inter.variable}`}>
      <body suppressHydrationWarning className="antialiased">
        <ClientBody>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ClientBody>
      </body>
    </html>
  );
}
