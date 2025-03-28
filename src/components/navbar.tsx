import { Link } from "@heroui/link";
import {
  Navbar as HeroUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@heroui/navbar";
import { ThemeSwitch } from "@/components/theme-switch";
import { Logo } from "@/components/icons";
import { useSelector } from "react-redux";
import { selectUser } from "@/state/selectors";
import { Button } from "@heroui/button";
import SignIn from "./signIn";
import LogIn from "./logIn";
import { signOut } from "@/state/thunks";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/state/store";
import { addToast } from "@heroui/toast";
import { useState } from "react";

export const Navbar = () => {
  // prendo l'utente con useSelector
  const user = useSelector(selectUser);

  // dispatch per fare il logout
  const dispatch: AppDispatch = useDispatch();

  // gestione del logout
  const [isMenuOpen, setIsMenuOpen] = useState(false); // per chiudere il menu dopo logout
  const handleLogout = () => {
    dispatch(signOut());
    // chiudo il navbar menu
    setIsMenuOpen(false);
    // aggiungo un toast
    addToast({
      title: "Successfully logout",
      color: "success",
      timeout: 3000,
      shouldShowTimeoutProgress: true,
    });
    console.log("ciao");
  };

  return (
    <HeroUINavbar
      isBordered
      maxWidth="xl"
      position="sticky"
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
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
        <NavbarMenuToggle className="sm:hidden" />
        <NavbarMenu>
          {user ? (
            <>
              <NavbarMenuItem>
                <Link className="w-full" href="#" size="lg" color="foreground">
                  Profile
                </Link>
              </NavbarMenuItem>
              <NavbarMenuItem>
                <Link
                  className="w-full"
                  href="#"
                  size="lg"
                  onPress={handleLogout}
                  color="danger"
                >
                  Log out
                </Link>
              </NavbarMenuItem>
            </>
          ) : (
            <>
              <NavbarMenuItem>
                <Link className="w-full" href="#" size="lg">
                  <SignIn link={true} />
                </Link>
              </NavbarMenuItem>
              <NavbarMenuItem>
                <Link className="w-full" href="#" size="lg">
                  <LogIn link={true} />
                </Link>
              </NavbarMenuItem>
            </>
          )}
        </NavbarMenu>
        <div className="hidden sm:flex gap-4 justify-start ml-2">
          {user ? (
            <>
              <Button> Profile </Button>
              <Button onPress={handleLogout}> Log out </Button>
            </>
          ) : (
            <>
              <SignIn button={true} />
              <LogIn button={true} />
            </>
          )}
        </div>
        <ThemeSwitch />
      </NavbarContent>
    </HeroUINavbar>
  );
};
