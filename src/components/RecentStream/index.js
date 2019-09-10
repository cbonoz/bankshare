import React, { useState, useEffect } from "react"
import contact from "./../../util/contact.js"
import StackGrid from "react-stack-grid";

import "./styles.scss"
import { useAuth } from "../../util/auth.js";
import { startContract } from "../../api/index.js";

function RecentStream(props) {
  const auth = useAuth()
  const [blocks, setBlocks] = useState([])

  const addBlock = () => {
    const block = {
      timestamp: Date.now(),
      recipient: 'test@test.com',
      sender: 'chrisdistrict@gmail.com',
      amount: Math.random() * 5,
      currency: 'ETH'
    }
    const nextBlocks = [block, ...blocks]
    const len = Math.min(6, nextBlocks.length)
    setBlocks(nextBlocks.slice(0, len))
  }

  useEffect(() => {
    async function getBlocksForEmail() {
      const email = auth.user.email
      console.log('getBlocks', email)
      try { 
        const response = await startContract('payments', 'list', JSON.stringify({email}))
        console.log('resp', response)
        const data = JSON.parse(response)
        setBlocks(data)
      } catch (e) {
        console.error('error getting list', e)
      }
    }
    getBlocksForEmail()
  })

  return <div>
    <StackGrid duration={500} columnWidth={600}>
      {blocks.map((v, i) => {
        const { timestamp, recipient, sender, amount, currency } = v
        const ts = new Date(timestamp)
        const dateString = `${ts.toDateString()} ${ts.toLocaleTimeString()}`
        return (
        <div className='payment-block' key={i}>
          <div className='payment-block-header'>
            Recent Transaction: {dateString}
          </div>
          <div className="live-block">
            {sender} -> {recipient}<br/>
            {amount.toFixed(5)} {currency}<br/>
          </div>
        </div>)
      })}
    </StackGrid>
  </div>
}

export default RecentStream
