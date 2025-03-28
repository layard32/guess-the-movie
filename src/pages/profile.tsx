import DefaultLayout from "@/layouts/default";
import { useSelector } from "react-redux";
import { selectUser } from "@/state/selectors";
import { useLocation } from "wouter";
import { useEffect } from "react";

export default function IndexPage() {
  // per sicurezza controllo se c'è un utente: se non c'è lo rimando alla home
  const user = useSelector(selectUser);
  console.log(user);

  const [, navigate] = useLocation();
  useEffect(() => {
    if (!user) navigate("/");
  }, [user, navigate]);

  return (
    <DefaultLayout>
      <div className="ml-1.5 text-xl font-bold">
        {user?.user_metadata.user_name.charAt(0).toUpperCase() +
          user?.user_metadata.user_name.slice(1)}
      </div>
    </DefaultLayout>
  );
}
