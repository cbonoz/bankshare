import React, { useState } from "react"
import Auth from "./../Auth"
import { useAuth } from "./../../util/auth.js"
import googleLogo from "../../assets/torus_google_login.svg"

import "./styles.scss"

function SignIn(props) {
  const auth = useAuth()
  const [status, setStatus] = useState()

  const onSubmit = ({ email, name }) => {
    setStatus({ type: "pending" })
    auth.signin(email, name)
  }

  return (
    <div>
      <Auth
        mode="signin"
        buttonText={props.buttonText}
        parentColor={props.parentColor}
        onSubmit={onSubmit}
        status={status}
      />

    </div>
  )
}

export default SignIn
