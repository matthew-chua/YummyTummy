import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

// Don't delete
// initialise firebase app (need this import to initialise even tho we not calling the app)
import app from "./Firebase/firebase";

//pages
import LandingPage from "./Pages/LandingPage";
import DashboardPage from "./Pages/DashboardPage";
import EventPage from "./Pages/EventPage";
import NavBar from "./Layout/NavBar";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import { AuthProvider } from "./Auth/AuthProvider";
import TestPage from "./Pages/TestPage";
import { LoginModal } from "./Components/Modals/LoginModal";

function App() {
  return (
    <AuthProvider>
      <Router>
        <NavBar />
        <Switch>
          <Route exact path='/welcome' component={LandingPage} />
          <PrivateRoute exact path='/home' component={DashboardPage} />
          <Route exact path='/event/:id' component={EventPage} />
          {/* <PrivateRoute exact path="/test" component={TestPage} /> */}
          <Route exact path='/test' component={LoginModal} />
          <Route path='/'>
            <Redirect to='/welcome' />
          </Route>
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
