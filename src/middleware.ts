import { NextRequest, NextResponse } from 'next/server'
import { getUrl } from './lib/get-url'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('authjs.session-token')
  const pathname = request.nextUrl.pathname

  console.log('Middleware:', { pathname, token }) // Adicionar log para depuração

  if (pathname === '/auth' && token) {
    return NextResponse.redirect(new URL(getUrl('/app'), request.url))
  }

  if (pathname.includes('/app') && !token) {
    return NextResponse.redirect(new URL(getUrl('/auth'), request.url))
  }

  return NextResponse.next() // Garantir que outras requisições prossigam normalmente
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
