import React, { useEffect, useState } from "react"
import { useAuth } from "./../../util/auth.js"
import { useRouter } from "./../../util/router.js"
import "./styles.scss"

import logo from "../../assets/bankshare_icon.png"
import LendingSection from "../../components/LendingSection/index.js"

function DashboardPage(props) {
  const auth = useAuth()
  const router = useRouter()

  const [showInviteModal, setShowInviteModal] = useState(false)
  const [invitedUser, setInvitedUser] = useState('')
  const [account, setAccount] = useState('')
  const [balance, setBalance] = useState('')


  const setStateInfo = async () => {
    const web3 = window.web3
    if (web3) {
      try {
      const accounts = await web3.eth.getAccounts()
      setAccount(accounts[0])
      const balance = await web3.eth.getBalance(accounts[0])
      setBalance(balance)
      } catch (e) {
        console.error(e)
      }
    } else {
      console.error('web3 not defined')
    }
  }

  // Redirect to signin
  // if not signed in.
  useEffect(() => {
    // auth.setTorusUser(window.torus, user)
    setStateInfo()
    if (auth.user === false) {
      router.push("/signin")
    }
  }, [window.web3, auth])

  // TODO: Dashboard page after logging in.
  if (!auth.user) {
    return null
  }

  const user = auth.user

  const inviteCurrentUser = async (userEmail) => {
    const torus = window.torus
    // TODO: invite user to platform.
    console.log('invited', userEmail)
  }


  const checkTorus = () => {
    const torus = window.torus
    if (torus) {
      torus.showWallet()
    }
  }

  // const user = {
  //     profileImage: "https://lh3.googleusercontent.com/a-/AAuE7mB1Gs_I-8s_v1T6A5LyvfJseQ2yf3PyJOZ4XCM6DA=s96-c",
  //     name: "Chris Buonocore",
  //     email: "cb@gmail.com"
  // }
  let { name, email, profileImage, address } = user
  profileImage = profileImage || 'https://myrealdomain.com/images600_/generic-avatar.png'

  return (
    <div className="dashboard-section">

      <div className="columns center-container">
        <div className="column is-one-third profile-section">
          {/* {JSON.stringify(auth.user)} */}
{/* <div className="dashboard-header centered">
        <img className="centered image-block" src={logo} />
      </div> */}
          <h1 className="h1-header account-margin dashboard-header">Your Account</h1>
          <hr/>
          <p>Signed in as:</p>
          <figure className="image is-128x128 image-block">
            <img className="is-rounded image-block" src={profileImage} />
          </figure>

          {name && <p className='dashboard-name'>{name}</p>}
          <a href={email} target="_blank">
            {email}
          </a>
          <div className='account-section'>
            {account && <div>Account: {account}</div>}
            {balance && <div>Balance: {balance}</div>}
            {address && <div>Address: {address}</div>}
            <div>Activity Score:<br/>0</div>
          </div>
          <br/>

          <a className="button is-success invite-button" onClick={() => setShowInviteModal(true)}>
            Invite a Friend
          </a>

          <a className="button is-primary account-button" onClick={() => checkTorus()}>
            Your Wallet
          </a>



        </div>

        <div className="column is-two-thirds">
          <LendingSection user={auth.user} />
        </div>
      </div>

      {showInviteModal && (
        <div className="modal is-active">
          <div className="modal-background"></div>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">Invite a friend</p>
              <button className="delete" aria-label="close" onClick={() => setShowInviteModal(false)}></button>
            </header>
            <section className="modal-card-body">
              <p>
                Invite a user to the platform to accept their cryptocurrency simply by entering an email below.
                The sent balance will automatically be presented as a credited loan for the user to either accept or deny.
              </p>
              <input className="input" onChange={(e) => setInvitedUser(e.target.value)} type="text" placeholder="Enter email"/>
            </section>
            <footer className="modal-card-foot">
              <button className="button" onClick={() => setShowInviteModal(false)}>
                Cancel
              </button>
              <button onClick={() => inviteCurrentUser(invitedUser)} className="button is-success">Invite</button>
            </footer>
          </div>
        </div>
      )}
    </div>
  )
}

export default DashboardPage
