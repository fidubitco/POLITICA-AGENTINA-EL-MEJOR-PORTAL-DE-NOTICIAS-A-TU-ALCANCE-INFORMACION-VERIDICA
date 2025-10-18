import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { localeCodes, defaultLocale } from './lib/locales'

const locales = localeCodes

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Check if there is any supported locale in the pathname
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) return NextResponse.next()

  // Redirect if there is no locale
  const locale = defaultLocale
  request.nextUrl.pathname = `/${locale}${pathname}`
  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|icon|apple-icon|manifest|.*\\.svg|.*\\.png|.*\\.jpg).*)',
  ],
}
