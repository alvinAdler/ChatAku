import Cookies from 'js-cookie'

import "./ProfileDetails_master.scss"

import AvatarHolder from "../AvatarHolder/AvatarHolder"
import DefaultButton, { DeclineButton, SuccessButton } from '../Buttons'

import customAxios from '../../utilities/customAxios'

const ProfileDetails = ({userInfo, isDetailVisible, onDetailToggle}) => {

	const determineActionButton = () => {
		switch(userInfo.status){
			case "FRIEND":
				return <DeclineButton onClick={handleFriendRemoval}>Remove</DeclineButton>
			case "REQUESTING":
				return <>
				<SuccessButton onClick={() => handleRequest("ACCEPT")}>Accept</SuccessButton>
				<DeclineButton onClick={() => handleRequest("REJECT")}>Reject</DeclineButton>
			</>
			case "STRANGER":
				return <DefaultButton onClick={handleFriendRequest}>Send Request</DefaultButton>
			default:
				console.error("Invalid user status")
		}
	}

	const handleFriendRemoval = () => {
		customAxios({
			method: "PATCH",
			url: "/users/deleteFriend",
			headers: {
				"Authorization": `Bearer ${Cookies.get("authToken")}`
			},
			data: {
				targetUserId: userInfo._id,
			}
		})
		.then((res) => {
			if(res.status === 200){
				alert("User has been removed from friend list")
				onDetailToggle()
			}
		})
		.catch((err) => {
			if(err.response){
				console.error(err.response.data)
			}else{
				console.error(err)
			}
		})

	}

	const handleFriendRequest = () => {
		customAxios({
			method: "POST",
			url: "/users/sendRequest",
			headers: {
				"Authorization": `Bearer ${Cookies.get("authToken")}`
			},
			data: {targetUserId: userInfo._id}
		})
		.then((res) => {
			if(res.status === 200){
				alert("Friend request has been sent")
				onDetailToggle()
			}
		})
		.catch((err) => {
			if(err.response){
				console.error(err.response.data)
			}else{
				console.error(err)
			}
		})

	}

	const handleRequest = (action) => {
		if(action.toUpperCase() !== "ACCEPT" && action.toUpperCase() !== "REJECT"){
			alert("Invalid action")
			return
		}

		customAxios({
			method: "POST",
			url: "/users/handleRequestStatus",
			headers: {
				"Authorization": `Bearer ${Cookies.get("authToken")}`
			},
			data: {
				targetUserId: userInfo._id,
				action
			}
		})
		.then((res) => {
			if(res.status === 200){
				alert("Friend request has been accepted")
				onDetailToggle()
			}
		})
		.catch((err) => {
			if(err.response){
				console.error(err.response.data)
			}else{
				console.error(err)
			}
		})
	}

	return (
		<div className={`profile-details-container ${isDetailVisible && "open"}`}>
			<div className="main-content">
				<span>{userInfo.username}</span>
				<AvatarHolder avatarName={userInfo.avatarName}/>
				<span>{userInfo.firstName} {userInfo.lastName}</span>
				
				{determineActionButton()}
			</div>
			<div className="black-banner" onClick={onDetailToggle}></div>
		</div>
	)
}

export default ProfileDetails