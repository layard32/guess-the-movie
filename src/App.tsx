import { Route, Switch } from "wouter";
import IndexPage from "@/pages/index";
import ProfilePage from "@/pages/profile";
import ResetPage from "@/pages/resetPassword";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchSession } from "@/state/thunks";
import { AppDispatch } from "@/state/store";
import { addToast } from "@heroui/toast";
import { useRef } from "react";

function App() {
  const dispatch: AppDispatch = useDispatch();

  // gestisco la sessione tramite thunks e store
  // ed utilizo useref per evitare di dispatchare 2 volte la funzione
  const hasFetchedSession = useRef(false);
  useEffect(() => {
    if (!hasFetchedSession.current) {
      hasFetchedSession.current = true;
      dispatch(fetchSession());
    }
  }, []);

  // gestisco il toast dopo i rendirizzamenti di oauth
  useEffect(() => {
    const loginSuccess = localStorage.getItem("loginSuccess");
    if (loginSuccess) {
      addToast({
        title: "You successfully logged in",
        color: "success",
        timeout: 3000,
        shouldShowTimeoutProgress: true,
      });
      localStorage.removeItem("loginSuccess"); // lo rimuovo
    }
  }, []);

  return (
    <>
      {/* switch consente di fare matching esclusivo (il primo corretto viene renderizzato; gli altri vengono ignorati) */}
      <Switch>
        <Route path="/" component={IndexPage} />
        <Route path="/profile" component={ProfilePage} />
        <Route path="/reset" component={ResetPage} />
        <Route path="*" component={IndexPage} />
      </Switch>
    </>
  );
}

export default App;
