// styles
import classes from "./NavBar.module.css";

// hooks
import { useState, useContext } from "react";

// components
import { NavLink, useParams } from "react-router-dom";

// assets
import logo from "../Assets/YummyTummyLogo.svg";
import { auth, onLogout } from "../Auth/auth";
import { AuthContext } from "../Auth/AuthProvider";

// store
// import { AuthContext } from "../Store/AuthContextProvider";

// helpers
// import navBarLinks from "../../Helpers/navBarLinks";

const NavBar = () => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const { currentUser } = useContext(AuthContext);
  
  const url = document.location.href;
    const endpoint = url.split('/')[3];

  const menuClickHandler = () => {
    setMenuIsOpen((prevState) => {
      return !prevState;
    });
  };

  const signOutOnClickHandler = () => {
    onLogout();
  }

  return (
    <>
      {currentUser && (
        <div className={classes.wrapper}>
          <div className={`${classes.navBar} ${classes.navBarJustify}`}>
            <NavLink className={classes.navTitle} to="/documents">
              <img className={classes.logo} src={logo} alt="TrueSign Logo" />
            </NavLink>
            <div className={classes.buttonGroup}>
              <div
                className={`${classes.navLinks} ${menuIsOpen || classes.close}`}
              >
                {/* {navBarLinks.map((link) => (
            <NavLink
              key={link.to}
              className={classes.navLink}
              to={link.to}
              activeClassName={classes.activeNavLink}
              exact
              onClick={menuClickHandler}
            >
              {link.text}
            </NavLink>
          ))} */}
              </div>
              <button
                onClick={signOutOnClickHandler}
                className={classes.button}
              >
                Sign Out
              </button>
              {/* <i
          className={`${menuIsOpen ? "fa fa-times" : "fa fa-bars"} ${
            classes.icon
          }`}
          onClick={menuClickHandler}
        ></i> */}
            </div>
          </div>
          <hr></hr>
        </div>
      )}
    </>
  );
};

export default NavBar;
