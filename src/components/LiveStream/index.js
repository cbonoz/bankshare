import React, { useState, useEffect } from "react"
import contact from "./../../util/contact.js"
import StackGrid from "react-stack-grid";

import faker from 'faker'

import "./styles.scss"

function LiveStream(props) {
  const [status, setStatus] = useState()
  const [blocks, setBlocks] = useState([])

  const addBlock = () => {
    const sender = faker.internet.email().toLowerCase()
    const recipient = faker.internet.email().toLowerCase()
    const block = {
      timestamp: Date.now(),
      recipient,
      sender,
      amount: Math.random() * 5,
      currency: 'ETH'
    }
    console.log(JSON.stringify(block))
    const nextBlocks = [block, ...blocks]
    const len = Math.min(10, nextBlocks.length)
    setBlocks(nextBlocks.slice(0, len))
  }

  useEffect(() => {
    const randMs = Math.round(Math.random() * (1000)) + 2000; // generate new time (between 2 and 5s
    setTimeout(addBlock, randMs);
    // for (var i = 0; i < 10; i ++) {
    //   addBlock()
    // }
    return () => {
    };
  }, [blocks])

  return <div>
    <StackGrid duration={500} columnWidth={600}>
      {blocks.map((v, i) => {
        const { timestamp, recipient, sender, amount, currency } = v
        const ts = new Date(timestamp)
        const dateString = `${ts.toDateString()} ${ts.toLocaleTimeString()}`
        return (
        <div className='payment-block'>
          <div className='payment-block-header'>
            Recent Transaction
          </div>
          <div className="live-block" key={i}>
            <b>{dateString}</b><br/>
            {sender} -> {recipient}<br/>
            {amount.toFixed(5)} {currency}<br/>
          </div>
        </div>)
      })}
    </StackGrid>
  </div>
}

export default LiveStream
