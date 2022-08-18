import { MdSend } from 'react-icons/md'

import "./ChatTyper_master.scss"

import { RoundedInput } from "../FormInput"

const ChatTyper = () => {
    return (
        <div className="chat-typer-container">
            <RoundedInput placeholder="say hello!"/>
            <button><MdSend/></button>
        </div>
    )
}

export default ChatTyper