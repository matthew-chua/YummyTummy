import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useHistory,
} from "react-router-dom";

// initialise firebase app
import app from "./Firebase/firebase";

//pages
import LandingPage from "./Pages/LandingPage";
import DashboardPage from "./Pages/DashboardPage";
import EventPage from "./Pages/EventPage";
import NavBar from "./Layout/NavBar";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import { AuthProvider } from "./Auth/AuthProvider";

function App() {
  return (
    <AuthProvider>
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/welcome" component={LandingPage} />
          <PrivateRoute exact path="/home" component={DashboardPage} />
          <PrivateRoute exact path="/event/:id" component={EventPage} />
          <Route path="/">
            <Redirect to="/welcome"/>
          </Route>
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
