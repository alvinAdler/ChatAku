import "./Dashboard_master.scss"

import Sidebar from "../../components/Sidebar/Sidebar"

const Dashboard = () => {
	return (
		<div className="dashboard-container">
			<Sidebar/>
			<div className="main-chat">
				<h1>Content</h1>
				<p>Lorem</p>
			</div>
		</div>
	)
}

export default Dashboard