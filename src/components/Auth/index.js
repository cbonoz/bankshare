import React, { useState, useEffect } from "react"
import FormStatus from "./../FormStatus"
import FormField from "./../FormField"
import SectionButton from "./../SectionButton"
import { Link, useRouter } from "./../../util/router.js"
import googleLogo from "../../assets/torus_google_login.svg"
import Torus from "@toruslabs/torus-embed"
import Web3 from "web3"

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

  useEffect(() => {
    async function checkLogin() { 
      const existingUserString = localStorage.getItem('bankShareUser')
      if (existingUserString) {
        try {
          const existingUser = JSON.parse(existingUserString)
          setExistingUser(existingUser)
          await torusLogin()
        } catch (e) {
           localStorage.removeItem('bankShareUser') // clear state.
        }
   

        const loc = window.location.pathname
        if (loc === "/signin" || loc === "/signup") {
          if (auth && auth.user) {
            router.push("/dashboard")
          }
        }
      }
    }

    checkLogin()
  })


  const [showErrors, setShowErrors] = useState(false)


  const loginTorusUser = async () => {
    const torus = window.torus
    try {
      await torus.login() // await torus.ethereum.enable()
    } catch (e) {
      // continue, might already have session
    }
    if (!auth.user) {
      try {
        const userInfo = await torus.getUserInfo()
        const email = userInfo.email
        if (email) {
          const address = await torus.getPublicAddress(userInfo.email)
          userInfo['address'] = address
        }
        auth.setTorusUser(torus, userInfo)
        if (userInfo.profileImage) {
          // push dashboard if we got the connection from a provider.
          router.push("/dashboard")
        }
      } catch (e) {
        console.error(e)
      }
    }
  }

  const torusLogin = async () => {
    setLoading(true)
    const torus = window.torus
    if (!window.web3 && torus) {
      window.web3 = new Web3(torus.provider)
    }

    if (existingUser) {
      auth.setTorusUser(torus, existingUser)
    } else if (name && email) {
      auth.setTorusUser(torus, {name, email})
      // const redirectUrl = `http://localhost:3000/dashboard`
      // const sqUrl = encodeURI(`https://app.squarelink.com/authorize?client_id=${SQ_CODE}&scope=[user]&redirect_uri=${redirectUrl}&response_type=token`)
      // window.location.assign(sqUrl)

    } else {
      try {
        await loginTorusUser()
      } catch (e) {
        console.error(e)
      }
    }
  
    setLoading(false)
  }

  // Error array we'll populate
  let errors = []

  // Function for fetching error for a field
  const getError = field => {
    return errors.find(e => e.field === field)
  }

  // Function to see if field is empty
  const isEmpty = val => val.trim() === ""

  // Add error if password empty
    if (isEmpty(name)) {
      errors.push({
        field: "name",
        message: "Please enter your name"
      })
    }

  // Handle form submission
  const handleSubmit = async () => {
    // If field errors then show them
    if (errors.length) {
      setShowErrors(true)
    } else {
      // Otherwise call onSubmit with email/pass
      if (props.onSubmit) {
        await torusLogin()
      }
    }
  }

  return (
    <div className="Auth">
      {!loading && <div>
      {props.status && props.status.message && (
        <FormStatus type={props.status.type} message={props.status.message} />
      )}

      <form
        onSubmit={e => {
          e.preventDefault()
          handleSubmit()
        }}
      >

        <FormField
            value={name}
            type="text"
            placeholder="Name"
            error={showErrors}
            onChange={value => setName(value)}
          />

        {["signup", "signin", "forgotpass"].includes(props.mode) && (
          <FormField
            value={email}
            type="email"
            placeholder="Email"
            error={showErrors && getError("email")}
            onChange={value => setEmail(value)}
          />
        )}

      <div className="field">
          <p className="control ">
          {true && SQ_CODE && <a onClick={() => handleSubmit()} className='sign-in-button'>
              <img src="https://squarelink.com/img/sign-in.svg"/>
          </a>}
            {false && <SectionButton
              parentColor={props.parentColor}
              size="medium"
              fullWidth={true}
              state={
                props.status && props.status.type === "pending"
                  ? "loading"
                  : "normal"
              }
            >
              {props.buttonText}
            </SectionButton>}
          </p>
        </div>

      </form>
      <hr />
      <p className="centered or-text">or</p>
        <div className="torus-login">
          <img
            src={googleLogo}
            className="login-button centered"
            onClick={() => torusLogin()}
          />
        </div>
        </div>
      }
      {loading && <img src={loadingSpinner} className='loading-spinner' />}
    </div>
  )
}

export default Auth
