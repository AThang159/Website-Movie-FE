import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const role = request.cookies.get("role")?.value // Giả sử cookie này lưu "ADMIN" hoặc "USER"

  // Nếu là trang /admin nhưng không phải ADMIN, thì chặn
  if (pathname.startsWith("/admin") && role !== "ADMIN") {
    return NextResponse.redirect(new URL("/unauthorized", request.url))
  }

  return NextResponse.next()
}

// Áp dụng middleware cho các route cần bảo vệ
export const config = {
  matcher: ["/admin/:path*"],
}
