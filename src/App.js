import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

//pages
import LandingPage from "./Pages/LandingPage";
import Home from "./Pages/Home";
import EventPage from "./Pages/EventPage";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/welcome" component={LandingPage}/>
        <Route exact path="/home" component={Home}/>
        <Route exact path="/event/:id" component={EventPage}/>
        <Route path="/">
          <Redirect to="/welcome"/>
        </Route>
      
      </Switch>
    </Router>
  );
}

export default App;
