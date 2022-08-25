import { useState } from 'react'
import { MdSend } from 'react-icons/md'

import "./ChatTyper_master.scss"

import { RoundedInput } from "../FormInput"

const ChatTyper = ({ onSend }) => {

    const [message, setMessage] = useState("")

    return (
        <form className="chat-typer-container" onSubmit={(ev) => {
            onSend(ev, message)
            setMessage("")
        }}>
            <RoundedInput type="text" placeholder="say hello!"
            value={message}
            onChange={(ev) => setMessage(ev.target.value)}
            />
            <button type="submit"><MdSend/></button>
        </form>
    )
}

export default ChatTyper