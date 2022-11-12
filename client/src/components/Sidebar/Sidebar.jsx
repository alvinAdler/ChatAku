import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiLogOut, FiUser, FiMenu } from 'react-icons/fi'
import { FaPlus } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Cookies from 'js-cookie'

import "./Sidebar_master.scss"

import ContactHolder from '../ContactHolder/ContactHolder'
import RoundedButton from '../Buttons'
import ChatContactSelector from '../ChatContactSelector/ChatContactSelector'
import NoChatBanner from '../NoChatBanner/NoChatBanner'

const Sidebar = ({isSidebarVisible, toggleSidebarVis}) => {

	const [isChatAdderVisible, setIsChatAdderVisible] = useState(false)
	const navigate = useNavigate()

	const userInfo = useSelector((state) => state.user.info)

	const logout = () => {
		Cookies.remove("authToken")
		navigate("/login", {replace: true})
	}

	const processChat = (chat) => {
		if(chat.length === 2){
			if(chat[0].username === userInfo.username){
				return chat[1]
			}
			return chat[0]
		}

		return({
			avatarName: chat[0].avatarName,
			username: chat.map((item) => item.username).join("-")
		})
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
						{userInfo.chatList.length > 0 ?
							userInfo.chatList.map((chat, index) => (
								<ContactHolder key={index} 
								chatTitle={processChat(chat.participants).username} 
								chatAvatar={processChat(chat.participants).avatarName} 
								chatId={chat._id}
								/>
							))
						:
							<NoChatBanner/>
						}
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