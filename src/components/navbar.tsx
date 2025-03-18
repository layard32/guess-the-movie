import { Link } from "@heroui/link";
import {
  Navbar as HeroUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@heroui/navbar";
import { link as linkStyles } from "@heroui/theme";
import clsx from "clsx";
import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { Logo } from "@/components/icons";
import { useSelector } from "react-redux";
import { selectUser } from "@/state/selectors";

export const Navbar = () => {
  // prendo l'utente usadno useSelector
  const user = useSelector(selectUser);

  const navItem = (item: (typeof siteConfig.navItems)[number]) => (
    <NavbarItem key={item.href}>
      {/* TODO: cambiare da link a button ed associargli componenti corrette */}
      <Link
        className={clsx(
          linkStyles({ color: "foreground" }),
          "data-[active=true]:text-primary data-[active=true]:font-medium"
        )}
        color="foreground"
        href={item.href}
      >
        {item.label}
      </Link>
    </NavbarItem>
  );

  return (
    <HeroUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand className="gap-3 max-w-fit">
          <Link
            className="flex justify-start items-center gap-1"
            color="foreground"
            href="/"
          >
            {/* TODO: cambiare logo */}
            <Logo />
            <p className="font-bold text-inherit">Movie Guesser</p>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="sm:flex basis-1 pl-4" justify="end">
        <div className="flex gap-4 justify-start ml-2">
          {siteConfig.navItems.map((item) =>
            user && (item.label === "Profile" || item.label === "Sign out")
              ? navItem(item)
              : !user && item.label !== "Profile" && item.label !== "Sign out"
                ? navItem(item)
                : null
          )}
        </div>
        <ThemeSwitch />
      </NavbarContent>
    </HeroUINavbar>
  );
};
