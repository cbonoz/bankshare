import React, { useEffect } from "react"
import Navbar from "./../../components/Navbar"
import HomePage from "./../home"
import AboutPage from "./../about"
import DashboardPage from "./../dashboard"
import SigninPage from "./../signin"
import { Switch, Route, Router, useRouter } from "./../../util/router.js"
import { Redirect, Router as RouterOriginal, withRouter } from "react-router-dom";
import Footer from "./../../components/Footer"
import { ProvideAuth, useAuth } from "./../../util/auth.js"
import web3Obj from '../../util/torusHelper'

import "./styles.scss"

import bankShare from "../../assets/bankshare_logo.png"



function App(props) {
  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
     (web3Obj.hasweb3())
        ? <Component {...props} />
        : <Redirect to='/signin' />
    )} />
  )

  return (
    <ProvideAuth>
      <Router>
        <Navbar color="white" spaced={true} logo={bankShare} />

        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/signin" component={SigninPage} />
          <Route
            exact
            path="/dashboard"
            render={props => <DashboardPage {...props} />}
          />

          {/* Basic routes */}
          <Route exact path="/about" component={AboutPage} />
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
                  The page <code>{location.pathname}</code> could not be found.
                </div>
              )
            }}
          />
        </Switch>

        <Footer
          color="light"
          size="normal"
          logo={bankShare}
          copyright="© 2019 BankShare"
        />
      </Router>
    </ProvideAuth>
  )
}

export default App
