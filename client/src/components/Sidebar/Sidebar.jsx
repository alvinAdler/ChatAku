import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiLogOut, FiUser, FiMenu } from 'react-icons/fi'
import { FaPlus } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie'

import "./Sidebar_master.scss"

import ContactHolder from '../ContactHolder/ContactHolder'
import RoundedButton from '../Buttons'
import ChatContactSelector from '../ChatContactSelector/ChatContactSelector'

const Sidebar = ({isSidebarVisible, toggleSidebarVis}) => {

	const [isChatAdderVisible, setIsChatAdderVisible] = useState(false)
	const navigate = useNavigate()

	const logout = () => {
		Cookies.remove("authToken")
		navigate("/login", {replace: true})
	}

	return (
		<>
			<aside className={`sidebar-container ${isSidebarVisible && "open"}`}>
				<div className="main-sidebar">
					<header>
						<img src="/publicImages/ChatAku_alt.svg" alt="ChatAku" />
						<button type="button" onClick={logout}><FiLogOut/></button>
						<Link to="/friends"><FiUser/></Link>
					</header>
					<div className="chat-list">
						<ContactHolder/>
						<ContactHolder/>
						<ContactHolder/>
					</div>
				</div>
				<button className="sidebar-toggler" type="button" onClick={toggleSidebarVis}><FiMenu/></button>
				<RoundedButton className="add-chat-button" onClick={() => setIsChatAdderVisible(true)}>
					<FaPlus/>
				</RoundedButton>
			</aside>
			<ChatContactSelector isVisible={isChatAdderVisible} 
			onCloseChatAdder={() => setIsChatAdderVisible(false)}
			/>
		</>
	)
}

export default Sidebar