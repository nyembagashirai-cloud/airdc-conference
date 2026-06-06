export { auth as middleware } from "@/auth";

export const config = {
  // Protect all /admin routes except /admin/login
  matcher: ["/admin/((?!login).*)"],
};
