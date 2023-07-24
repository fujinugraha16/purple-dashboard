import { NextResponse } from "next/server"

export async function middleware(request) {
  const response = NextResponse.next()

  let token = null

  if (request.cookies.has("token")) {
    token = request.cookies.get("token")?.value
  }

  if (request.nextUrl.pathname.startsWith("/login") && !token) return

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url))
  }
  
  if (request.nextUrl.pathname.startsWith("/login") && token) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  return response
}

export const config = {
  matcher: [
    "/",
    "/carts",
    "/carts/:id*",
    "/login",
  ],
}