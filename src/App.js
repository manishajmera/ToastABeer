import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import {BeerList,DashBoard,BeerDetail} from "./Pages";

export default function App() {
  return (
    <Router>
        <Switch>
          <Route exact path="/:id">
            <BeerDetail />
          </Route>
          <Route path="/dashboard">
            <DashBoard />
          </Route>
          <Route path="/">
            <BeerList />
          </Route>
        </Switch>
    </Router>
  );
}

