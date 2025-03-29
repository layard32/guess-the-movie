import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "@/state/selectors";
import { useLocation } from "wouter";

export const checkUserRedirect = (redirectTo: string) => {
  // se l'utente non è loggato, reindirizzo a redirectTo
  const user = useSelector(selectUser);
  const [, navigate] = useLocation();
  useEffect(() => {
    if (!user) navigate(redirectTo);
  }, [user, navigate]);

  // restituisco l'utente
  return user;
};
