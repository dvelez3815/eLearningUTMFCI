import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

/* Pages */
import ActivitiesPage from "./pages/ActivitiesPage/ActivitiesPage";
import HomePage from "./pages/HomePage/HomePage";
import SigInPage from "./pages/SigInPage/SigInPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/activities" component={ActivitiesPage} />
          <Route exact path="/signin" component={SigInPage} />
          <Route exact path="/signup" component={SignUpPage} />
          <Route exact path="/" component={HomePage} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
