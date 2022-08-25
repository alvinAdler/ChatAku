import "./ChatHolder_master.scss"

import AvatarHolder from "../AvatarHolder/AvatarHolder"

const ChatHolder = ({user, message}) => {
    return (
        <div className="chat-holder-container">
            <AvatarHolder avatarName={user.avatarName}/>
            <div className="chat-content">
                <p style={{color: `hsl(${user.chatColor.hueNum}, ${user.chatColor.satNum}%, ${user.chatColor.lightNum}%)`}}>{user.username}</p>
                <p>{message}</p>
            </div>
        </div>
    )
}

export default ChatHolder