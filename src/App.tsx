import { Route, Switch } from "wouter";
import IndexPage from "@/pages/index";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchSession } from "@/state/thunks";
import { AppDispatch } from "@/state/store";
import { addToast } from "@heroui/toast";

function App() {
  const dispatch: AppDispatch = useDispatch();

  // gestisco la sessione tramite thunks e store
  useEffect(() => {
    dispatch(fetchSession());
  }, [dispatch]);

  // gestisco il login dopo oauth (quindi dopo callback)
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
        <Route path="/profile" component={IndexPage} />
      </Switch>
      <Route path="/" component={IndexPage} />
    </>
  );
}

export default App;
