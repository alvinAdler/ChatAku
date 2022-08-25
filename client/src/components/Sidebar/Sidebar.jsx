import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { FiLogOut, FiUser, FiMenu } from 'react-icons/fi'
import { Link } from 'react-router-dom'

import "./Sidebar_master.scss"

import ContactHolder from '../ContactHolder/ContactHolder'

const Sidebar = ({isSidebarVisible, toggleSidebarVis}) => {

	const navigate = useNavigate()

	const logout = () => {
		Cookies.remove("authToken")
		navigate("/login", {replace: true})
	}

	return (
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
			<button type="button" onClick={toggleSidebarVis}><FiMenu/></button>
		</aside>
	)
}

export default Sidebar