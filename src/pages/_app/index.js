import React from "react"
import Navbar from "./../../components/Navbar"
import HomePage from "./../home"
import AboutPage from "./../about"
import FaqPage from "./../faq"
import PricingPage from "./../pricing"
import ContactPage from "./../contact"
import DashboardPage from "./../dashboard"
import SigninPage from "./../signin"
import SignupPage from "./../signup"
import ForgotpassPage from "./../forgotpass"
import ChangepassPage from "./../changepass"
import { Switch, Route, Router, useRouter } from "./../../util/router.js"
import Footer from "./../../components/Footer"
import { ProvideAuth, useAuth } from "./../../util/auth.js"

import "./styles.scss"

import bankShare from "../../assets/bankshare_logo.png"


function App(props) {

  return (
    <ProvideAuth>
      <Router>
        <>
          <Navbar color="white" spaced={true} logo={bankShare} />

          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/about" component={AboutPage} />
            <Route exact path="/faq" component={FaqPage} />
            <Route exact path="/pricing" component={PricingPage} />
            <Route exact path="/contact" component={ContactPage} />
            <Route exact path="/dashboard" component={DashboardPage} />
            <Route exact path="/signin" component={SigninPage} />
            <Route exact path="/signup" component={SignupPage} />
            <Route exact path="/forgotpass" component={ForgotpassPage} />
            <Route exact path="/changepass" component={ChangepassPage} />

            <Route
              component={({ location }) => {
                return (
                  <div
                    style={{
                      padding: "50px",
                      width: "100%",
                      textAlign: "center"
                    }}
                  >
                    The page <code>{location.pathname}</code> could not be
                    found.
                  </div>
                )
              }}
            />
          </Switch>

          <Footer
            color="light"
            size="normal"
            logo={bankShare}
            copyright="©2019 BankShare"
          />
        </>
      </Router>
    </ProvideAuth>
  )
}

export default App
