import "./ProfileDetails_master.scss"

import AvatarHolder from "../AvatarHolder/AvatarHolder"
// import DefaultButton from "../Buttons"

const ProfileDetails = ({userInfo, isDetailVisible, onDetailToggle}) => {

	return (
		<div className={`profile-details-container ${isDetailVisible && "open"}`}>
			<div className="main-content">
				<span>{userInfo.username}</span>
				<AvatarHolder avatarName={userInfo.avatarName}/>
				<span>{userInfo.firstName} {userInfo.lastName}</span>
			</div>
			<div className="black-banner" onClick={onDetailToggle}></div>
		</div>
	)
}

export default ProfileDetails