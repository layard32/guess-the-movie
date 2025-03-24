import { Link } from "@heroui/link";
import {
  Navbar as HeroUINavbar,
  NavbarBrand,
  NavbarContent,
} from "@heroui/navbar";
import { ThemeSwitch } from "@/components/theme-switch";
import { Logo } from "@/components/icons";
import { useSelector } from "react-redux";
import { selectUser } from "@/state/selectors";
import { Button } from "@heroui/button";
import SignIn from "./signIn";
import LogIn from "./logIn";
import { signOut } from "@/state/thunks";

export const Navbar = () => {
  // prendo l'utente usadno useSelector
  const user = useSelector(selectUser);

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
          {user ? (
            <>
              <Button> Profile </Button>
              <Button onPress={() => signOut}> Log out </Button>
            </>
          ) : (
            <>
              <SignIn />
              <LogIn />
            </>
          )}
        </div>
        <ThemeSwitch />
      </NavbarContent>
    </HeroUINavbar>
  );
};
