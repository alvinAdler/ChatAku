import "./Registration_master.scss"

import FormInput, { LabeledFormInput } from "../../components/FormInput"
import DefaultButton from "../../components/Buttons"
import AvatarSelector from "../../components/AvatarSelector/AvatarSelector"

const Registration = () => {

	const registerUser = (ev) => {
		ev.preventDefault()
	}

    return (
    	<div className="regist-container" style={{ backgroundImage: "url(/publicImages/stacked-steps-haikei.svg)",}}>
			<div className="form-container">
				<img src="/publicImages/ChatAku.svg" alt="ChatAku"/>
				<form className="form-elements" onSubmit={registerUser}>
					<h2>Join us!</h2>
					<AvatarSelector id="form-avatar"/>
					<LabeledFormInput id="form-fname" label="First Name" placeholder="e.g. John"/>
					<LabeledFormInput id="form-lname" label="Last Name" placeholder="e.g. Doe"/>
					<LabeledFormInput id="form-usname" label="Username" placeholder="e.g. beachmaster"/>
					<LabeledFormInput id="form-pass" type="password" label="Password" placeholder="*****" autoComplete="off"/>
					<LabeledFormInput id="form-confpass" type="password" label="Confirm Password" placeholder="*****" autoComplete="off"/>
					<DefaultButton id="form-submit" type="submit">register</DefaultButton>
				</form>
			</div>
		</div>
    )
}

export default Registration