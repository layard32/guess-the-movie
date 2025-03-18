export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Movie guesser",
  navItems: [
    {
      label: "Login",
      href: "/login",
    },
    {
      label: "Register",
      href: "/register",
    },
    {
      label: "Sign out",
      href: "/sign-out",
    },
    {
      label: "Profile",
      href: "/profile",
    },
  ],
};
