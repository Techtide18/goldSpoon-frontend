import { auth as middleware } from "@/auth";

export default middleware((req) => {
  const isLoggedIn = !!req.auth;
  const { nextUrl } = req;
  const userRole = req.auth?.user?.role;
  console.log("middleware", userRole);

  if (nextUrl.pathname === "/register") {
    return;
  }

  if (isLoggedIn) {
    if (userRole === "admin" && !nextUrl.pathname.startsWith("/admin")) {
      return Response.redirect(new URL("/admin", nextUrl));
    } else if (userRole === "user" && !nextUrl.pathname.startsWith("/user")) {
      return Response.redirect(new URL("/user", nextUrl));
    }
  } else {
    if (nextUrl.pathname != "/login") {
      return Response.redirect(new URL("/login", nextUrl));
    }
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
