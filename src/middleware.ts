import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    const token = req.cookies.get("token")?.value;

    const isAuthPage = req.nextUrl.pathname.startsWith("/login");

    if (!token && !isAuthPage) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/", "/goals", "/routine", "/settings", "/dashboard", "/profile"],
};