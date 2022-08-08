import { Routes, Route } from "react-router-dom"

import "./App.scss"

import ProtectedRoute from "./components/ProtectedRoute"
import Login from "./pages/Login/Login"
import Registration from "./pages/Registration/Registration"
import Dashboard from "./pages/Dashboard/Dashboard"
import FriendsPage from './pages/FriendsPage/FriendsPage'

function App() {
	return (
		<div className="app">
			<Routes>
				<Route path="/" element={<ProtectedRoute component={Dashboard}/>} />
				<Route path="/friends" element={<ProtectedRoute component={FriendsPage}/>} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Registration/>}/>
			</Routes>
		</div>
	)
}

export default App
