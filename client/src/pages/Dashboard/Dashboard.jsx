import { useState } from "react"

import "./Dashboard_master.scss"

import Sidebar from "../../components/Sidebar/Sidebar"
import ChatStarter from "../../components/ChatStarter/ChatStarter"

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
				<ChatStarter isVisible={true}/>
			</div>
		</div>
	)
}

export default Dashboard