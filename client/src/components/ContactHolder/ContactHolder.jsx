import { useDispatch } from "react-redux"

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

const ContactHolder = ({ user=DUMMY_USER, chatId, ...others }) => {

    const dispatch = useDispatch()

    const handleContactClick = () => {
        if(!chatId) return

        dispatch(setActiveChatId({chatId}))
    }

    return (
        <div className="contact-holder-container" onClick={handleContactClick} {...others}>
            <AvatarHolder avatarName={user.avatarName}/>
            <p>{user.username}</p>
        </div>
    )
}

export default ContactHolder