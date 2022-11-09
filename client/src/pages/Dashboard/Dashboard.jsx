import { useState, useEffect, useRef } from "react"
import { v4 as uuid } from 'uuid'
import { useSelector, useDispatch } from 'react-redux'
import Cookies from "js-cookie"

import "./Dashboard_master.scss"

import { findChatOpponent } from "../../utilities/utilityFunctions"
import { pushChat } from "../../utilities/reducers/user"
import customAxios from "../../utilities/customAxios"

import LoadingScreen from '../../components/LoadingScreen/LoadingScreen'
import Sidebar from "../../components/Sidebar/Sidebar"
import ChatStarter from "../../components/ChatStarter/ChatStarter"
import ChatTyper from "../../components/ChatTyper/ChatTyper"
import ChatHolder from '../../components/ChatHolder/ChatHolder'

const Dashboard = () => {

	const [isSidebarVisible, setIsSidebarVisible] = useState(true)
	const [activeChat, setActiveChat] = useState(undefined)
	const [isFetchingChat, setIsFetchingChat] = useState(false)

	const chatBody = useRef()

	const user = useSelector((state) => state.user)
	const dispatch = useDispatch()
	const socket = useSelector((state) => state.socket.socket)

	const authToken = Cookies.get("authToken")

	useEffect(() => {
		socket.on("receive-message", (data) => {
			dispatch(pushChat({data}))
		})
	}, [])

	useEffect(() => {
		if(user.activeChatId === "") return

		setIsFetchingChat(true)

		customAxios({
			method: "GET",
			url: `/users/getChat/${user.activeChatId}`,
			headers: {
				"Authorization": `Bearer ${authToken}`
			}
		})
		.then((res) => {
			setActiveChat(res.data.chat)
			console.log(res.data)
		})
		.catch((err) => {
			console.error(err)
		})
		.finally(() => {
			setIsFetchingChat(false)
		})
	}, [user.activeChatId])

	useEffect(() => {
		setActiveChat(user.info.chatList.find((chat) => chat._id === user.activeChatId))
	}, [user.info.chatList.find((chat) => chat._id === user.activeChatId)?.chatHistory])

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
			<LoadingScreen message="Fetching chats" isVisible={isFetchingChat}/>
		</div>
	)
}

export default Dashboard