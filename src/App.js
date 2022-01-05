import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UpdateOnboardingDefaults from "./pages/UpdateOnboardingDefaults";
import Tracker from "./pages/Tracker";
import AllTrades from "./pages/AllTrades";
import "./App.css";
function App() {
  return (
    <Router>
      <Switch>
        <Route
          exact
          path='/update-account'
          component={UpdateOnboardingDefaults}
        />

        <Route exact path='/' component={Tracker} />
        <Route path='/trades' component={AllTrades} />
      </Switch>
    </Router>
  );
}

export default App;
