import "./ChatHolder_master.scss"

import AvatarHolder from '../AvatarHolder/AvatarHolder'

const ChatHolder = () => {
    return (
        <div className="chat-holder-container">
            <AvatarHolder avatarName="Avatar1"/>
            <p>A very very very very long chat name A very very very very long chat name A very very very very long chat name A very very very very long chat name</p>
        </div>
    )
}

export default ChatHolder