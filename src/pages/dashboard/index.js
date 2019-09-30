import React, { useEffect, useState } from "react"
import { useAuth } from "./../../util/auth.js"
import { useRouter } from "./../../util/router.js"
import "./styles.scss"
import web3Obj from '../../util/torusHelper'

import logo from "../../assets/bankshare_icon.png"
import LendingSection from "../../components/LendingSection/index.js"

function DashboardPage(props) {
  const auth = useAuth()
  const router = useRouter()
  const [userInfo, setUserInfo] = useState({})
  const [account, setAccount] = useState('')
  const [balance, setBalance] = useState('')

  useEffect(() => {
    const getInfo = async () => {
      console.log('getInfo')
      if (!userInfo || !userInfo.email) {
        try {
          const user = await web3Obj.torus.getUserInfo()
          console.log('got user info', user)
          if(user && user['data'] && user['data']['payload']) {
            const info = user['data']['payload']
            auth.setTorusUser(web3Obj.torus, info)
            setUserInfo(info)
          }
        } catch (e) {
          console.error('error getting userinfo', e)
          router.push('/signin')
          alert('Please login again')
        }
      }
    }
    getInfo()
  }, [])

  if (!web3Obj.hasweb3()) {
    return null
  }

  const checkTorus = () => {
    const torus = web3Obj.torus
    if (torus) {
      torus.showWallet()
    }
  }

  let { name, email, profileImage, address } = userInfo
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
          </div>
          <br/>

          <a className="button is-primary account-button" onClick={() => checkTorus()}>
            Your Wallet
          </a>

          </div>
        <div className="column is-two-thirds">
          <LendingSection user={userInfo} />
        </div>
    </div>
    </div>)
}

export default DashboardPage
