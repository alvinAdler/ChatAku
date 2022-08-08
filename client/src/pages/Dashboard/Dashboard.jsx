import "./Dashboard_master.scss"

import Sidebar from "../../components/Sidebar/Sidebar"
import ChatStarter from "../../components/ChatStarter/ChatStarter"

const Dashboard = () => {
	return (
		<div className="dashboard-container">
			<Sidebar/>
			<div className="main-chat">
				<ChatStarter isVisible={true}/>
			</div>
		</div>
	)
}

export default Dashboard