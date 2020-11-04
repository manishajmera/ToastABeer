import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import {BeerList,DashBoard,BeerDetail} from "./Pages";
import {Layout} from "./Components";

export default function App() {
  return (
    <Router>
        <Layout>
        <Switch>
        <Route exact path="/dashboard">
            <DashBoard />
          </Route>
          <Route exact path="/:id">
            <BeerDetail />
          </Route>
          <Route path="/">
            <BeerList />
          </Route>
        </Switch>
        </Layout>
    </Router>
  );
}

