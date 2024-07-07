import { auth as middleware } from "@/auth";

export default middleware((req) => {

    console.log("middleware");
  const isLoggedIn = !!req.auth;
  const { nextUrl } = req;
  const userRole = req.auth?.user?.role;
  
   if (isLoggedIn) {
    if (nextUrl.pathname == "/login") {
      return Response.redirect(new URL("/", nextUrl));
    }

    if (userRole === "admin" && !nextUrl.pathname.startsWith("/admin")) {
      return Response.redirect(new URL("/admin/dashboard", nextUrl));
    }

    // if (userRole === "user" && nextUrl.pathname.startsWith("/admin")) {
    //   return Response.redirect(new URL("/dashboard", nextUrl));
    // }
  } else {
    if (nextUrl.pathname != "/login") {
      return Response.redirect(new URL("/login", nextUrl));
    }
  }

});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

//session

// const session = await auth();
// if (!session) redirect("/login");

//session.user.role = "admin"?
