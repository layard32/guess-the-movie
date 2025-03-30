import { useEffect } from "react";
import { useLocation } from "wouter";
import { useSelector } from "react-redux";
import { selectUser, selectAuthLoading } from "../state/selectors";

// custom hooks per reindirizzare a redirectTo se l'utente non è loggato
const authRedirect = (redirectTo: string = "/") => {
    const user = useSelector(selectUser); // Get the user from Redux
    const loading = useSelector(selectAuthLoading); // Get the loading state from Redux
    const [, navigate] = useLocation();
    useEffect(() => {
        // se non c'è utente e non si sta caricando
        if (!loading && !user) navigate(redirectTo);
    }, [user, loading, navigate, redirectTo]);

    // restituisco l'utente
    return user;
}

export default authRedirect;