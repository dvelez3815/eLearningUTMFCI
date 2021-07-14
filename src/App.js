import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";

/* Pages */
import ActivitiesPage from './pages/ActivitiesPage/ActivitiesPage'
import HomePage from './pages/HomePage/HomePage';
function App() {
  return (
    <Router>
      <div className="App">
          <Route exact path="/activities" component={ActivitiesPage}></Route>
          <Route exact path="/" component={HomePage}></Route>

      </div>
    </Router>
    
  );
}

export default App;


