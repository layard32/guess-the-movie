import { useSelector } from "react-redux";
import { selectUser } from "@/state/authSlice";

// custom hook per ottenre l'username
const giveUsername = () => {
    const user = useSelector(selectUser);

    // prendo l'username, se ci sta, oppure il name (se loggato con google)
    // per gestire worst-case uso 'guest'
    const userName = user?.user_metadata.user_name
        ? user?.user_metadata.user_name.charAt(0).toUpperCase() +
        user?.user_metadata.user_name.slice(1)
        : user?.user_metadata.name
            ? user?.user_metadata.name.charAt(0).toUpperCase() +
             user?.user_metadata.name.slice(1)
            : "Guest";

    return userName;
}

export default giveUsername;