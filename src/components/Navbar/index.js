import React, { useState, useEffect } from "react";
import NavbarContainer from "./../NavbarContainer";
import { Link, useRouter } from "./../../util/router.js";
import { useAuth } from "./../../util/auth.js";
import Torus from "@toruslabs/torus-embed";
import Web3 from "web3";
import "./styles.scss";

function Navbar(props) {
  const auth = useAuth();
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div>
    <NavbarContainer spaced={props.spaced} color={props.color}>
      <div className="container">
        <div className="navbar-brand">
          <div className="navbar-item">
            <a href="/">
              <img className="image" src={props.logo} alt="Logo" />
            </a>
          </div>
          <div
            className={"navbar-burger burger" + (menuOpen ? " is-active" : "")}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span />
            <span />
            <span />
          </div>
        </div>
        <div className={"navbar-menu" + (menuOpen ? " is-active" : "")}>
          <div className="navbar-end">
              <Link className="navbar-item" to="/about">
                About
              </Link>
              {/* <Link className="navbar-item" to="/contact">
                Contact
              </Link> */}
            {auth.user && (
              <div className="navbar-item has-dropdown is-hoverable">
                <Link className="navbar-link" to="/">
                  Account
                </Link>
                <div className="navbar-dropdown is-boxed">
                  <Link className="navbar-item" to="/dashboard">
                    Dashboard
                  </Link>
                  <Link
                    className="navbar-item"
                    to="/"
                    onClick={e => {
                      e.preventDefault();
                      auth.logout();
                      router.push('/')
                    }}
                  >
                    Sign out
                  </Link>
                </div>
              </div>
            )}

            {!auth.user && (
              <Link className="navbar-item" to="/signin">
                Sign in
              </Link>
            )}
          </div>
        </div>
      </div>
    </NavbarContainer>
      <div className='gray-divider'>
      </div>
      </div>
  );
}

export default Navbar;
