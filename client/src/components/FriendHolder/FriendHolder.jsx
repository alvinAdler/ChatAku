import { useState } from 'react'

import "./FriendHolder_master.scss"

import AvatarHolder from "../AvatarHolder/AvatarHolder"
import ProfileDetails from '../ProfileDetails/ProfileDetails'

const DUMMY_USER = {
	avatarName: "Avatar2",
	firstName: "Johny",
	lastName: "Black",
	username: "johnyblack"
}

const FriendHolder = ({user=DUMMY_USER}) => {

	const [isDetailVisible, setIsDetailVisible] = useState(false)

	return (
		<>
			<div className="friend-holder-container" 
			onClick={() => setIsDetailVisible((prevState) => !prevState)}
			>
				<AvatarHolder avatarName={user.avatarName}/>
				<span>{user.username}</span>
			</div>

			<ProfileDetails userInfo={user} isDetailVisible={isDetailVisible}
			onDetailToggle={() => setIsDetailVisible((prevState) => !prevState)}
			/>
		</>
	)
}

export default FriendHolder