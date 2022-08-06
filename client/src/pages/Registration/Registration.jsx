import { useReducer } from 'react'

import "./Registration_master.scss"

import { LabeledFormInput, LabeledPasswordInput } from "../../components/FormInput"
import DefaultButton from "../../components/Buttons"
import AvatarSelector from "../../components/AvatarSelector/AvatarSelector"
import customAxios from '../../utilities/customAxios'

const ACTIONS = {
	MOD_AVATAR: "avatarName",
	MOD_FNAME: "firstName",
	MOD_LNAME: "lastName",
	MOD_USNAME: 'username',
	MOD_PASS: "password",
	MOD_CONPASS: "confirmPassword"
}

const Registration = () => {

	const [userInfo, dispatch] = useReducer(userReducer, {
		avatarName: null,
		firstName: "",
		lastName: "",
		username: "",
		password: "",
		confirmPassword: ""
	})

	function registerUser(ev){
		ev.preventDefault()

		if(Object.values(userInfo).some((item) => item === "" || item === null)){
			alert("An element is empty. Please fill-out everything")
			return
		}

		if(userInfo.password !== userInfo.confirmPassword){
			alert("Password mismatch.")
			return
		}

		customAxios({
			method: "POST",
			url: "/users/register",
			data: userInfo
		})
		.then((res) => {
			if(res.status === 200){
				alert("Ok")
				dispatch({type: "reset"})
			}
		})
		.catch((err) => {
			console.error(err)
		})

	}

	function userReducer(state, action){
		switch(action.type){
			case "reset":
				return({
					[ACTIONS.MOD_AVATAR]: null,
					[ACTIONS.MOD_FNAME]: "",
					[ACTIONS.MOD_LNAME]: "",
					[ACTIONS.MOD_USNAME]: "",
					[ACTIONS.MOD_PASS]: "",
					[ACTIONS.MOD_CONPASS]: ""
				})
			default:
				return({
					...state,
					[action.type]: action.payload
				})
			}
		}

    return (
    	<div className="regist-container" style={{ backgroundImage: "url(/publicImages/stacked-steps-haikei.svg)",}}>
			<div className="form-container">
				<img src="/publicImages/ChatAku.svg" alt="ChatAku"/>
				<form className="form-elements" onSubmit={registerUser}>
					<h2>Join us!</h2>
					<AvatarSelector id="form-avatar"
					value={userInfo.avatarName}
					onChange={(avatarName) => dispatch({type: ACTIONS.MOD_AVATAR, payload: avatarName})}
					/>
					<LabeledFormInput id="form-fname" label="First Name" placeholder="e.g. John"
					value={userInfo.firstName}
					onChange={(ev) => dispatch({type: ACTIONS.MOD_FNAME, payload: ev.target.value})}
					/>
					<LabeledFormInput id="form-lname" label="Last Name" placeholder="e.g. Doe"
					value={userInfo.lastName}
					onChange={(ev) => dispatch({type: ACTIONS.MOD_LNAME, payload: ev.target.value})}
					/>
					<LabeledFormInput id="form-usname" label="Username" placeholder="e.g. beachmaster"
					value={userInfo.username}
					onChange={(ev) => dispatch({type: ACTIONS.MOD_USNAME, payload: ev.target.value})}
					/>
					<LabeledPasswordInput id="form-pass" label="Password" placeholder="*****" autoComplete="off"
					value={userInfo.password}
					onChange={(ev) => dispatch({type: ACTIONS.MOD_PASS, payload: ev.target.value})}
					/>
					<LabeledPasswordInput id="form-confpass" label="Confirm Password" placeholder="*****" autoComplete="off"
					value={userInfo.confirmPassword}
					onChange={(ev) => dispatch({type: ACTIONS.MOD_CONPASS, payload: ev.target.value})}
					/>
					<DefaultButton id="form-submit" type="submit">register</DefaultButton>
				</form>
			</div>
		</div>
    )
}

export default Registration