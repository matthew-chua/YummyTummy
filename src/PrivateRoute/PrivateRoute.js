import app from "../Firebase/firebase";
import {useContext} from "react";
import { Route, Redirect } from "react-router-dom";
import { auth } from "../Auth/auth";
import { AuthContext } from "../Auth/AuthProvider";


const PrivateRoute = ({ component: Component, ...rest }) => {
  const { currentUser } = useContext(AuthContext);

  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /signin page
    <Route
      {...rest}
      render={(props) =>
        !!currentUser ? <Component {...props} /> : <Redirect to="/welcome" />
      }
    />
  );
};

export default PrivateRoute;
