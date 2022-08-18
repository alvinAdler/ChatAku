import { useState } from "react"

import "./Dashboard_master.scss"

import Sidebar from "../../components/Sidebar/Sidebar"
import ChatStarter from "../../components/ChatStarter/ChatStarter"
import ChatTyper from "../../components/ChatTyper/ChatTyper"

const Dashboard = () => {

	const [isSidebarVisible, setIsSidebarVisible] = useState(true)

	return (
		<div className="dashboard-container">
			<Sidebar isSidebarVisible={isSidebarVisible} 
			toggleSidebarVis={() => {
				console.log("I am clicked")
				setIsSidebarVisible((prevState) => !prevState)
			}}
			/>
			<div className="main-chat">
				<ChatStarter isVisible={false}/>

				<div className="chat-header">
					<h1>A Cool Chat</h1>
				</div>
				<div className="chat-body">
					<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam ducimus molestias vero minima asperiores molestiae et, hic perspiciatis magni! Rerum!</p>
					<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam ducimus molestias vero minima asperiores molestiae et, hic perspiciatis magni! Rerum!</p>
				</div>
				<div className="message-typer">
					<ChatTyper/>
				</div>
			</div>
		</div>
	)
}

export default Dashboard