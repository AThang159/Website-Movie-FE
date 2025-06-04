import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

function parseJwt(token: string) {
  try {
    const base64Payload = token.split('.')[1]
    const payload = Buffer.from(base64Payload, 'base64').toString('utf-8')
    return JSON.parse(payload)
  } catch {
    return null
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

    const token = request.cookies.get('token')?.value

  if (pathname === '/admin/login') {
    return NextResponse.next()
  }

  if (pathname.startsWith('/admin/overview')) {
    if (!token) {
      // return null;
      return NextResponse.redirect(new URL('/unauthorized', request.url))
    }

    const decoded = parseJwt(token)
    console.log(decoded)

    if (!decoded || decoded.role !== 'ADMIN') {
      // return null;
      return NextResponse.redirect(new URL('/unauthorized', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
