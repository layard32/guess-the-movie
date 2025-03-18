import { Route, Switch } from "wouter";
import IndexPage from "@/pages/index";

function App() {
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
