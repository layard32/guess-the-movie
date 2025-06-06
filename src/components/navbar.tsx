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
import { selectUser } from "@/state/authSlice";
import { Button } from "@heroui/button";
import SignInButtonLink from "./authComponents/signInButtonLink";
import LogInButtonLink from "./authComponents/logInButtonLink";
import { signOut } from "@/state/thunks";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/state/store";
import { addToast } from "@heroui/toast";
import { useState } from "react";
import { useLocation } from "wouter";

export const Navbar = () => {
  // prendo l'utente con useSelector
  const user = useSelector(selectUser);

  // dispatch per fare il logout
  const dispatch: AppDispatch = useDispatch();

  // gestione navigazione verso profile con wouter
  const [, navigate] = useLocation();
  const goToProfile = () => {
    navigate("/profile");
  };

  // gestione del logout
  const [isMenuOpen, setIsMenuOpen] = useState(false); // per chiudere il menu dopo logout
  // per evitare spam di logout
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleLogout = () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    dispatch(signOut()).finally(() => {
      setIsSubmitting(false);
    });
    // chiudo il navbar menu
    setIsMenuOpen(false);
    // aggiungo un toast
    addToast({
      title: "Successfully logout",
      color: "success",
      timeout: 3000,
      shouldShowTimeoutProgress: true,
    });
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
            <Logo className="mr-1" />
            <p className="font-bold text-inherit sm:text-2xl text-danger">
              Guess the movie
            </p>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="sm:flex basis-1 pl-4" justify="end">
        <NavbarMenuToggle className="sm:hidden" />
        <NavbarMenu>
          {user ? (
            <>
              <NavbarMenuItem>
                <Link
                  className="w-full cursor-pointer"
                  size="lg"
                  color="foreground"
                  onPress={goToProfile}
                >
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
                <SignInButtonLink link={true} key="signin" />
              </NavbarMenuItem>
              <NavbarMenuItem>
                <LogInButtonLink link={true} key="login" />
              </NavbarMenuItem>
            </>
          )}
        </NavbarMenu>
        <div className="hidden sm:flex gap-4 justify-start ml-2">
          {user ? (
            <>
              <Button onPress={goToProfile}> Profile </Button>
              <Button onPress={handleLogout}> Log out </Button>
            </>
          ) : (
            <>
              <SignInButtonLink button={true} />
              <LogInButtonLink button={true} />
            </>
          )}
        </div>
        <ThemeSwitch />
      </NavbarContent>
    </HeroUINavbar>
  );
};
