import { auth as middleware } from "@/auth";

export default middleware((req) => {
  const isLoggedIn = !!req.auth;
  const { nextUrl } = req;
  const userRole = req.auth?.user?.role;
  console.log("middleware", userRole);

  if (isLoggedIn) {
    if (nextUrl.pathname.startsWith("/login")) {
      console.log("lin");
      return Response.redirect(new URL("/", nextUrl));
    }

    if (userRole === "admin" && !nextUrl.pathname.startsWith("/admin")) {
      console.log("lin2");
      return Response.redirect(new URL("/admin", nextUrl));
    }

    if (userRole === "user" && nextUrl.pathname.startsWith("/admin")) {
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
