import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="bg-gray-100 py-8">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <Image
                src="/images/logo.png"
                alt="Moveek"
                width={120}
                height={24}
                className="mr-2"
              />
              <span className="text-sm font-semibold text-moveek-darkgray">
                CÔNG TY TNHH MONET
              </span>
            </div>
            <div className="text-sm text-moveek-lightgray space-y-1">
              <p>
                Số ĐKKD: 0315367026 · Nơi cấp: Sở kế hoạch và đầu tư Tp. Hồ Chí Minh
              </p>
              <p>Đăng ký lần đầu ngày 01/11/2018</p>
              <p>
                Địa chỉ: 33 Nguyễn Trung Trực, P.5, Q. Bình Thạnh, Tp. Hồ Chí Minh
              </p>
              <div className="flex flex-wrap items-center gap-2 pt-2">
                <Link href="/about-us" className="text-moveek-lightgray hover:text-moveek-red">
                  Về chúng tôi
                </Link>
                <span>·</span>
                <Link href="/privacy" className="text-moveek-lightgray hover:text-moveek-red">
                  Chính sách bảo mật
                </Link>
                <span>·</span>
                <Link href="/support" className="text-moveek-lightgray hover:text-moveek-red">
                  Hỗ trợ
                </Link>
                <span>·</span>
                <Link href="mailto:thailuu@moveek.vn" className="text-moveek-lightgray hover:text-moveek-red">
                  Liên hệ
                </Link>
                <span>·</span>
                <span className="text-moveek-lightgray">v8.1</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-moveek-darkgray mb-4">ĐỐI TÁC</h4>
            <div className="grid grid-cols-5 gap-4">
              {/* Partners logos - we'll use placeholder for now */}
              {[...Array(10)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-full w-10 h-10 flex items-center justify-center"
                >
                  <span className="text-xs text-gray-400">Logo</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Separator className="mb-8" />

        <div className="text-sm text-moveek-lightgray">
          <h4 className="font-semibold text-moveek-darkgray mb-3">Tp. Hồ Chí Minh</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="mb-2">
                <Link href="#" className="font-medium text-moveek-darkgray hover:text-moveek-red">
                  CGV Aeon Bình Tân
                </Link>
                <p className="text-xs mt-1">
                  Tầng 3, TTTM Aeon Mall Bình Tân, Số 1 Đường số 17A, khu phố 11, P. Bình Trị Đông B, quận Bình Tân, TP. Hồ Chí Minh
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
