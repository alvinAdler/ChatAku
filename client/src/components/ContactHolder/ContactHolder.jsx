import { useDispatch, useSelector } from "react-redux"

import "./ContactHolder_master.scss"

import AvatarHolder from '../AvatarHolder/AvatarHolder'
import { setActiveChatId } from "../../utilities/reducers/user"

const DUMMY_USER = {
	avatarName: "Avatar2",
	firstName: "Johny",
	lastName: "Black",
	username: "johnyblack",
    chatColor: {
        hueNum: 208,
        satNum: 100,
        lightNum: 50
    }
}

const ContactHolder = ({ chatTitle, chatAvatar, chatId, ...others }) => {

    const dispatch = useDispatch()
    const socket = useSelector((state) => state.socket.socket)
    const prevChatId = useSelector((store) => store.user.activeChatId)

    const handleContactClick = () => {
        if(!chatId) return

        socket.emit("join-room", {chatId, prevChatId})
        dispatch(setActiveChatId({chatId}))
    }

    return (
        <div className="contact-holder-container" onClick={handleContactClick} {...others}>
            <AvatarHolder avatarName={chatAvatar}/>
            <p>{chatTitle}</p>
        </div>
    )
}

export default ContactHolder