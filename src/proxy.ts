import { NextRequest, NextResponse } from "next/server";
import { userService } from "./services/user.service";
import { Roles } from "./constants/roles";
// proxy file use to restric route 
export default async function proxy(request: NextRequest) {

    const pathName = request.nextUrl.pathname;

    let isAuthenticated = false;
    let isAdmin = false;
    let isStudent = false;
    let isTutor = false;
    let isBan = false;

    const { data } = await userService.getSession();


    if (data) {
        isAuthenticated = true;
        isAdmin = data.user.role === Roles.ADMIN;
        isStudent = data.user.role === Roles.STUDENT;
        isTutor = data.user.role === Roles.TUTOR;
        isBan = data.user.isBan
    }

    if (!isAuthenticated) {
        return NextResponse.redirect(new URL("/login", request.url))
    }
    // if user is ban for the site
    if (isBan) {

        return NextResponse.redirect(new URL("/login", request.url))
    }

    // admin route 
    if (pathName.startsWith("/admin") && !isAdmin) {
        if (isStudent) {
            return NextResponse.redirect(new URL("/dashboard", request.url))
        }
        if (isTutor) {
            return NextResponse.redirect(new URL("/tutor/dashboard", request.url))
        }
    }

    // tutor
    if (pathName.startsWith("/tutor") && !isTutor) {
        if (isAdmin) {
            return NextResponse.redirect(new URL("/admin", request.url))
        }
        if (isStudent) {
            return NextResponse.redirect(new URL("/dashboard", request.url))
        }
    }
    // student
    if (pathName.startsWith("/dashboard") && !isStudent) {
        if (isAdmin) {
            return NextResponse.redirect(new URL("/admin", request.url))
        }
        if (isTutor) {
            return NextResponse.redirect(new URL("/tutor/dashboard", request.url))
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        "/dashboard/:path*",
        "/admin/:path*",
        "/tutor/:path*"
    ]
}