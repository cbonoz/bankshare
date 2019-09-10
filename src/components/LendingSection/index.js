import React, { useState } from "react"
import contact from "./../../util/contact.js"
import "./styles.scss"
import LiveStream from "../LiveStream/index.js"
import DepositPage from "../DepositPage/index.js"
import RecentStream from "../RecentStream/index.js"

function LendingSection(props) {
  const [status, setStatus] = useState()
  const [x, setX] = useState(0)
  const user = props.user

  return (
    <div>
    <div className="tabs is-centered is-boxed is-medium">
      <ul>
        <li className={x === 0 ? "is-active" : ""} onClick={() => setX(0)}>
          <a>
            <span className="icon is-small">
              <i className="fas fa-image" aria-hidden="true"></i>
            </span>
            <span>Your network's payments</span>
          </a>
        </li>
        {/* <li className={x === 1 ? "is-active" : ""} onClick={() => setX(1)}>
          <a>
            <span className="icon is-small">
              <i className="fas fa-film" aria-hidden="true"></i>
            </span>
            <span>Recent Payments</span>
          </a>
        </li> */}
        <li className={x === 2 ? "is-active" : ""} onClick={() => setX(2)}>
          <a>
            <span className="icon is-small">
              <i className="far fa-file-alt" aria-hidden="true"></i>
            </span>
            <span>Create a Payment</span>
          </a>
        </li>
      </ul>
    </div>
    <br/>
    {x === 0 && <LiveStream/>}
    {x === 1 && <RecentStream/>}
    {x === 2 && <DepositPage/>}
</div>
  )
}

export default LendingSection
