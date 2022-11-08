import { useState, useEffect, useRef, useMemo } from "react"
import { v4 as uuid } from 'uuid'
import { useSelector, useDispatch } from 'react-redux'

import "./Dashboard_master.scss"

import { findChatOpponent } from "../../utilities/utilityFunctions"
import { pushChat } from "../../utilities/reducers/user"
import Sidebar from "../../components/Sidebar/Sidebar"
import ChatStarter from "../../components/ChatStarter/ChatStarter"
import ChatTyper from "../../components/ChatTyper/ChatTyper"
import ChatHolder from '../../components/ChatHolder/ChatHolder'

const Dashboard = () => {

	const [isSidebarVisible, setIsSidebarVisible] = useState(true)

	const chatBody = useRef()

	const user = useSelector((state) => state.user)
	const dispatch = useDispatch()
	const socket = useSelector((state) => state.socket.socket)

	const activeChat = useMemo(() => {
		if(user.activeChatId === "") return
		return user.info.chatList.find((chat) => chat._id === user.activeChatId)	
	}, [user.activeChatId, user.info.chatList.find((chat) => chat._id === user.activeChatId)?.chatHistory])

	useEffect(() => {
		socket.on("receive-message", (data) => {
			dispatch(pushChat({data}))
		})
	}, [])

	useEffect(() => {
		//When there is a change in `messagesList`, scroll to the latest chat
		if(chatBody.current) chatBody.current.scrollTop = chatBody.current?.scrollHeight
	}, [activeChat?.chatHistory])

	const handleMessageSend = (ev, message) => {
		ev.preventDefault()

		const { chatList, ...rest } = user.info
		const {friendsList, requestList, ...newUser} = {...user, info: rest}
		
		const tempHolder = {
			user: rest,
			message: message,
			chatId: user.activeChatId
		}

		console.log(tempHolder)

		socket.emit("send-message", tempHolder)
		dispatch(pushChat({data: tempHolder}))
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