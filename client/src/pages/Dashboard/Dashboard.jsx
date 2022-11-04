import { useState, useEffect, useRef, useMemo } from "react"
import { v4 as uuid } from 'uuid'
import { useSelector, useDispatch } from 'react-redux'
import { io } from 'socket.io-client'

import "./Dashboard_master.scss"

import { findChatOpponent } from "../../utilities/utilityFunctions"
import { pushChat } from "../../utilities/reducers/user"
import Sidebar from "../../components/Sidebar/Sidebar"
import ChatStarter from "../../components/ChatStarter/ChatStarter"
import ChatTyper from "../../components/ChatTyper/ChatTyper"
import ChatHolder from '../../components/ChatHolder/ChatHolder'

const DUMMY_USER = {
	avatarName: "Avatar2",
	firstName: "Johny",
	lastName: "Black",
	username: "johnyblack",
    chatColor: {
        hueNum: 208,
        satNum: 100,
        lightNum: 50
    }
}

const Dashboard = () => {

	const [isSidebarVisible, setIsSidebarVisible] = useState(true)
	const [activeChat, setActiveChat] = useState(undefined)

	const chatBody = useRef()

	const user = useSelector((state) => state.user)
	const dispatch = useDispatch()

	useEffect(() => {
		//When there is a change in `messagesList`, scroll to the latest chat
		if(chatBody.current) chatBody.current.scrollTop = chatBody.current?.scrollHeight
	}, [activeChat?.chatHistory])

	useEffect(() => {
		if(user.activeChatId === "") return
		setActiveChat(user.info.chatList.find((chat) => chat._id === user.activeChatId))
	}, [user.activeChatId])

	const handleMessageSend = (ev, message) => {
		ev.preventDefault()
		
		const tempHolder = {
			user: user.info,
			message: message,
			chatId: user.activeChatId
		}

		console.log(tempHolder)

	}

	return (
		<div className="dashboard-container">
			<Sidebar isSidebarVisible={isSidebarVisible} 
			toggleSidebarVis={() => {
				setIsSidebarVisible((prevState) => !prevState)
			}}
			/>
			<div className="main-chat">
				<ChatStarter isVisible={user.activeChatId === ""}/>

				{user.activeChatId !== "" &&
				<>
					<div className="chat-header">
						<h1>{findChatOpponent(activeChat, user.info.username)?.username}</h1>
					</div>
					<div className="chat-body" ref={chatBody}>
						<div className="chats-container">
							{activeChat?.chatHistory.map((chat) => (
								<ChatHolder key={uuid()} user={chat.user} message={chat.message}/>
							))}
						</div>
					</div>
					<div className="message-typer">
						<ChatTyper onSend={handleMessageSend}/>
					</div>
				</>
				}
			</div>
		</div>
	)
}

export default Dashboard