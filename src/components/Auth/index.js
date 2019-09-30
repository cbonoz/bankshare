import React, { useState, useEffect } from "react"
import FormStatus from "./../FormStatus"
import FormField from "./../FormField"
import SectionButton from "./../SectionButton"
import { Link, useRouter } from "./../../util/router.js"
import googleLogo from "../../assets/torus_google_login.svg"
import Torus from "@toruslabs/torus-embed"
import web3Obj from '../../util/torusHelper'

import "./styles.scss"

import loadingSpinner from "../../assets/loading_spinner.gif"
import { useAuth } from "../../util/auth"

const SQ_CODE = process.env.REACT_APP_SQ_CODE

function Auth(props) {
  // State for all inputs
  const auth = useAuth()
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [existingUser, setExistingUser] = useState(false)
  const [pass, setPass] = useState("")
  const [confirmPass, setConfirmPass] = useState("")
  const [torus, setTorus] = useState(null)
  const [loading, setLoading] = useState(false)


  const loginTorusUser = async () => {
    setLoading(true)
    await web3Obj.initialize()
    
    if (web3Obj.hasweb3()) {
      try {
        const torus = web3Obj.torus
        const userInfo = await torus.getUserInfo()
        auth.setTorusUser(torus, userInfo)
        // push dashboard if we got the connection from a provider.
        if (userInfo) {
          web3Obj.setUserInfo(userInfo)
          router.push("/dashboard")
        } else {
          alert('Error connecting to network')
        }
      } catch (e) {
        console.error(e)
        alert('Authorization successful, click Sign In again')
      }
    }

    setLoading(false)
  }

  return (
    <div className="Auth">
      {!loading && <div>
      {props.status && props.status.message && (
        <FormStatus type={props.status.type} message={props.status.message} />
      )}
      <hr />
        <div className="torus-login">
          <img
            src={googleLogo}
            className="login-button centered"
            onClick={() => loginTorusUser()}
          />
        </div>
        </div>
      }
      {loading && <img src={loadingSpinner} className='loading-spinner' />}
    </div>
  )
}

export default Auth
