import { Routes, Route } from "react-router-dom"

import "./App.scss"

import Login from "./pages/Login/Login"
import Registration from "./pages/Registration/Registration"

function App() {
	return (
		<div className="app">
			<Routes>
				<Route path="/" element={<div>Index Page</div>} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Registration/>}/>
			</Routes>
		</div>
	)
}

export default App
