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
      label: "Profile",
      href: "/profile",
    },
  ],
};
