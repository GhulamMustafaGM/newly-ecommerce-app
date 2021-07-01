import React from "react";
import Login from "./Login";
import Register from "./Register";
import NoMatchPage from "./NoMatchPage";
import Dashboard from "./Dashboard";
import { HashRouter } from "react-router-dom";
import { Route, Switch } from "react-router";
import NavBar from "./NavBar";

function App() {
  return (
    <HashRouter>
      <NavBar />
      <div className="container-fluid">
        <Switch>
          <Route path="/" exact={true} component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="*" component={NoMatchPage} />
        </Switch>
      </div>
    </HashRouter>
  );
}

export default App;
