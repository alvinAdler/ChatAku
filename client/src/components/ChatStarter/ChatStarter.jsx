import "./ChatStarter_master.scss"

const ChatStarter = ({isVisible=false}) => {
    return (
        <>
        {isVisible &&
            <div className="chat-starter-container">
                <img src="/publicImages/BeginChat.svg" alt="Begin Chat" />
                <p>Go and say hi to your friends!</p>
            </div>
        }
        </>
    )
}

export default ChatStarter