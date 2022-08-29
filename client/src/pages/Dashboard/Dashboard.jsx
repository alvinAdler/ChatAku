import { useState, useEffect, useRef } from "react"
import { v4 as uuid } from 'uuid'
import { useSelector } from 'react-redux'

import "./Dashboard_master.scss"

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
	const [messagesList, setMessagesList] = useState([])

	const chatBody = useRef()

	const userInfo = useSelector((state) => state.user.info)

	useEffect(() => {
		const holderObj = {user: DUMMY_USER, message: "A sample text from the user. A sample text from the user. A sample text from the user. A sample text from the user. A sample text from the user."}
		const diffObj = {user: {...DUMMY_USER, username: "Changes"}, message: "A different message"}
		setMessagesList([holderObj, holderObj, holderObj, holderObj, holderObj, holderObj, holderObj, holderObj, holderObj, holderObj, holderObj, holderObj, holderObj, holderObj, holderObj, holderObj, diffObj])
	}, [])

	useEffect(() => {
		//When there is a change in `messagesList`, scroll to the latest chat
		chatBody.current.scrollTop = chatBody.current?.scrollHeight
	}, [messagesList])

	const handleMessageSend = (ev, message) => {
		ev.preventDefault()
		
		const tempHolder = {
			user: userInfo,
			message: message
		}

		setMessagesList((prevList) => [...prevList, tempHolder])
	}

	return (
		<div className="dashboard-container">
			<Sidebar isSidebarVisible={isSidebarVisible} 
			toggleSidebarVis={() => {
				setIsSidebarVisible((prevState) => !prevState)
			}}
			/>
			<div className="main-chat">
				<ChatStarter isVisible={false}/>

				<div className="chat-header">
					<h1>A Cool Chat</h1>
				</div>
				<div className="chat-body" ref={chatBody}>
					<div className="chats-container">
						{messagesList.map((chat) => (
							<ChatHolder key={uuid()} user={chat.user} message={chat.message}/>
						))}
					</div>
				</div>
				<div className="message-typer">
					<ChatTyper onSend={handleMessageSend}/>
				</div>
			</div>
		</div>
	)
}

export default Dashboard