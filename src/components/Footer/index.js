import React from "react";
import Section from "./../Section";
import { useAuth } from "./../../util/auth.js"
import { useRouter } from "./../../util/router.js"
import { Link } from "./../../util/router.js";
import "./styles.scss";

function Footer(props) {
  const auth = useAuth()
  const router = useRouter()

  return (
    <Section color={props.color} size={props.size}>
      <div className="FooterComponent__container container">
        <div className="brand left">
          <Link to="/">
            <img src={props.logo} alt="Logo" />
          </Link>
        </div>
        <div className="links right">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          {!auth.user && <Link to="/signin">Sign In</Link>}
          {auth.user && <Link
                    className="navbar-item"
                    to="/"
                    onClick={e => {
                      e.preventDefault();
                      // auth.logout();
                      router.push('/')
                    }}
                  >
                    Sign out
                  </Link>}
        </div>
        <div className="social right">
        </div>
        <div className="copyright left">{props.copyright}</div>
      </div>
    </Section>
  );
}

export default Footer;
