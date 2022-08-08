import { FiLogOut, FiUser, FiMenu } from 'react-icons/fi'

import "./Sidebar_master.scss"

const Sidebar = () => {
	return (
		<div className="sidebar-container">
			<header>
				<button><img src="/publicImages/ChatAku_alt.svg" alt="ChatAku" /></button>
				<button><FiLogOut/></button>
				<button><FiUser/></button>
				<button><FiMenu/></button>
			</header>
			<div className="chat-list">

			</div>
		</div>
	)
}

export default Sidebar