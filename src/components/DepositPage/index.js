import React, { useState } from "react"
import "./styles.scss"
import { useAuth } from "../../util/auth.js"
import { startContract } from "../../api/index.js"
import web3Obj from '../../util/torusHelper'

function DepositPage(props) {
  const auth = useAuth()
  const [status, setStatus] = useState()
  const [amount, setAmount] = useState(0)
  const [recipient, setRecipient] = useState("")
  const [address, setAddress] = useState("")
  const [currency, setCurrency] = useState("ETH")
  const [result, setResult] = useState({})
  const [showCompletedModal, setShowCompletedModal] = useState(false)

  const SQ_CODE = process.env.REACT_APP_SQ_CODE

  const depositRequest = async () => {
    const user = auth.user
    const sender = user.email
    let body = {
      timestamp: Date.now(),
      recipient,
      address,
      sender: sender || "",
      amount: parseFloat(amount),
      currency
    }
    body = JSON.stringify(body)
    console.log('user', user)

    if (!recipient || !amount) {
      alert("Recipient and amount should both be specified")
      return
    }

    if (!address) {
      alert("Email must be validated first")
      return
    }

    const to = address
    const from = web3Obj.web3.eth.accounts[0]
    const value = web3Obj.web3.toWei(amount, "ether")

    const doTorusTransaction = async () => {
      console.log(from, to, value)
      web3Obj.web3.eth.sendTransaction({
      from,
      to,
      value,
    }, function(error, hash){
      console.log(hash)
      setResult({error, hash})
      setShowCompletedModal(true)
    });
  }

    await doTorusTransaction()

  }

  const validateEmail = async () => {
    const torus = web3Obj.torus
    if (torus) {
      try {
        const address = await torus.getPublicAddress(recipient)
        setAddress(address)
      } catch (e) {
        console.error(e)
      }
    }
  }

  const { error, hash} = result

  return (
    <div className="deposit-section">
      <h1>New Payment</h1>
      <p>
        Send payments to friends, regardless if they have cryptocurrency
        accounts or not, via BankShare.
      </p>

      <div className="send-email">
        <div className="field">
          <label className="label">Email</label>
          <input
            className="input"
            onChange={e => setRecipient(e.target.value)}
            type="text"
            placeholder="Enter recipient email"
          />
        </div>
        <a className="button validate-button" onClick={() => validateEmail()}>
          Validate Email
        </a>
      </div>

      {address && (
        <div>
          Generated address: {address}
          <br />
        </div>
      )}
      <div className="field">
        <label className="label">Amount (ETH)</label>
        <input
          className="input"
          onChange={e => setAmount(e.target.value)}
          type="number"
          placeholder="Enter amount in ETH"
        />
      </div>
      <br />

      <a className="send-button" onClick={() => depositRequest()}>
        {/* Send it! */}
        <img src="https://squarelink.com/img/sign-tx.svg" width="220" />
      </a>

      {showCompletedModal && (
        <div className="modal is-active">
          <div className="modal-background"></div>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">Bankshare Payment Status</p>
              <button
                className="delete"
                aria-label="close"
                onClick={() => setShowCompletedModal(false)}
              ></button>
            </header>
            <section className="modal-card-body">
                {error && <div>
                  Error sending payment: {error}
                </div>}

                {hash && !error && <div>
                <p>
                  You successfully sent {amount} {currency} to {recipient}!<br />
                  The user can access their funds, bank-free, by going to{" "}
                  <a href="app.tor.us" target="_blank">
                    app.tor.us
                  </a>{" "}
                  and logging in with that same email.
                </p>
                <p>Transaction hash: {hash}</p>
              </div>}
            </section>
            <footer className="modal-card-foot">
              <button
                className="button"
                onClick={() => setShowCompletedModal(false)}
              >
                Done
              </button>
            </footer>
          </div>
        </div>
      )}
    </div>
  )
}

export default DepositPage
