import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import {ListComponent} from "./Components";

export default function App() {
  return (
    <Router>
        <Switch>
          <Route path="/about">
            <ListComponent />
          </Route>
        </Switch>
    </Router>
  );
}

