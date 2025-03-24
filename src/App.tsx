import { Route, Switch } from "wouter";
import IndexPage from "@/pages/index";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchSession } from "@/state/thunks";
import { AppDispatch } from "@/state/store";

function App() {
  const dispatch: AppDispatch = useDispatch();

  // gestisco la sessione tramite thunks e store
  useEffect(() => {
    dispatch(fetchSession());
  }, [dispatch]);

  return (
    <>
      {/* switch consente di fare matching esclusivo (il primo corretto viene renderizzato; gli altri vengono ignorati) */}
      <Switch>
        <Route path="/" component={IndexPage} />
      </Switch>
    </>
  );
}

export default App;
