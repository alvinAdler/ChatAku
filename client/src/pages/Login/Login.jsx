import { useState } from 'react'
import { Link } from 'react-router-dom'

import "./Login_master.scss"

import FormInput, { PasswordInput } from "../../components/FormInput"
import DefaultButton from "../../components/Buttons"
import customAxios from '../../utilities/customAxios'

const Login = () => {

	const [userInfo, setUserInfo] = useState({
		username: "",
		password: ""
	})

	function handleLogin(ev){
		ev.preventDefault()

		customAxios({
			method: "POST",
			url: "/users/login",
			data: userInfo
		})
		.then((res) => {
			if(res.status === 200){
				alert("Login successful")
				console.log(res)
				setUserInfo({
					username: "",
					password: ""
				})
			}
		})
		.catch((err) => {
			console.error(err)
			if(err.response){
				console.error(err.response.data.message)
			}
		})
	}

	function handleInputChange(attribute, value){
		setUserInfo((prevInfo) => ({...prevInfo, [attribute]: value}))
	}

	return (
		<div className="login-container" style={{ backgroundImage: "url(/publicImages/stacked-steps-haikei.svg)",}}>
			<div className="form-container">
				<img src="/publicImages/ChatAku.svg" alt="ChatAku"/>
				<form className="form-elements" onSubmit={handleLogin}>
					<h2>Welcome</h2>
					<FormInput type="text" placeholder="Username"
					value={userInfo.username}
					onChange={(ev) => handleInputChange("username", ev.target.value)}
					/>
					<PasswordInput placeholder="Password"
					value={userInfo.password}
					onChange={(ev) => handleInputChange("password", ev.target.value)}
					/>
					<DefaultButton type="submit">login</DefaultButton>
					<p>Don't have an account? <br></br> <Link to="/register">Create one here!</Link></p>
				</form>
			</div>
		</div>
	)
}

export default Login
