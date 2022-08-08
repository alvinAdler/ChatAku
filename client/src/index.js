import React from "react"
import ReactDOM from "react-dom/client"
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "./index.css"
import App from "./App"
import reportWebVitals from "./reportWebVitals"
import { BrowserRouter } from "react-router-dom"

import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import userReducer from './utilities/reducers/user'

const reduxStore = configureStore({
	reducer: {
		user: userReducer
	}
})

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
	<Provider store={reduxStore}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
