import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Public routes that don't require authentication
  const publicRoutes = [
    "/",
    "/login",
    "/register",
    "/pricing",
  ];

  // API routes that don't require protection
  const publicApiRoutes = ["/api/auth"];

  // Check if route is public
  const isPublicRoute = publicRoutes.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  );

  const isPublicApi = publicApiRoutes.some(
    (route) => pathname.startsWith(route)
  );

  // Allow static assets and public APIs
  // Permitir imagens, ícones e outros arquivos estáticos
  const staticFileExtensions = /\.(png|jpg|jpeg|gif|webp|svg|ico|css|js|woff|woff2|ttf|eot)$/i;
  if (isPublicApi || pathname.startsWith("/_next") || pathname.startsWith("/favicon") || staticFileExtensions.test(pathname)) {
    return NextResponse.next();
  }

  // Check for session
  const sessionCookie = request.cookies.get("better-auth.session_token");

  if (!sessionCookie && !isPublicRoute && !pathname.startsWith("/api")) {
    // Redirect to login with return URL
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // If authenticated and trying to access auth pages, redirect to dashboard
  if (sessionCookie && (pathname === "/login" || pathname === "/register")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
