import "./ContactHolder_master.scss"

import AvatarHolder from '../AvatarHolder/AvatarHolder'

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

const ContactHolder = ({ user=DUMMY_USER, ...others }) => {
    return (
        <div className="contact-holder-container" {...others}>
            <AvatarHolder avatarName={user.avatarName}/>
            <p>{user.username}</p>
        </div>
    )
}

export default ContactHolder