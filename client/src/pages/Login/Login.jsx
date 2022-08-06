import { Link } from 'react-router-dom'

import "./Login_master.scss"

import FormInput, { PasswordInput } from "../../components/FormInput"
import DefaultButton from "../../components/Buttons"

const Login = () => {
	return (
		<div className="login-container" style={{ backgroundImage: "url(/publicImages/stacked-steps-haikei.svg)",}}>
			<div className="form-container">
				<img src="/publicImages/ChatAku.svg" alt="ChatAku"/>
				<form className="form-elements">
					<h2>Welcome</h2>
					<FormInput type="text" placeholder="Username"/>
					<FormInput type="password" placeholder="Password" autoComplete="off"/>
					<PasswordInput placeholder="Password"/>
					<DefaultButton type="submit">login</DefaultButton>
					<p>Don't have an account? <br></br> <Link to="/register">Create one here!</Link></p>
				</form>
			</div>
		</div>
	)
}

export default Login
