import { useState, useEffect } from "react"
import { Navigate } from 'react-router-dom'
import { useDispatch } from "react-redux"
import Cookies from 'js-cookie'

import LoadingScreen from './LoadingScreen/LoadingScreen'
import customAxios from '../utilities/customAxios'
import { setFriendsList, setRequestList, setUserInfo } from "../utilities/reducers/user"

const STATES = {
    LOADING: "loading",
    REJECTED: "rejected",
    ACCEPTED: "accepted"
}

const ProtectedRoute = ({component: Component}) => {
    const [currentState, setCurrentState] = useState(STATES.LOADING)

    const userDispatcher = useDispatch()

    useEffect(() => {

        const authToken = Cookies.get("authToken")

        if(!authToken){
            setCurrentState(STATES.REJECTED)
            return
        }

        customAxios({
            method: "POST",
            url: "/users/tokenChecker",
            headers: {
                "Authorization": `Bearer ${authToken}`
            }
        })
        .then((res) => {
            if(res.status === 200){
                console.log(res.data)
                setCurrentState(STATES.ACCEPTED)
                userDispatcher(setUserInfo({userInfo: res.data.currentUser}))
                userDispatcher(setFriendsList({friendsList: res.data.friendsList}))
                userDispatcher(setRequestList({requestList: res.data.requestList}))
            }
        })
        .catch((err) => {
            console.error(err)
            if(err.response) console.log(err.response.data.message)
            setCurrentState(STATES.REJECTED)
        })
    }, [])

    const determineState = () => {
        switch(currentState){
            case STATES.LOADING:
                return <LoadingScreen isVisible={true}/>
            case STATES.REJECTED:
                return <Navigate to="/login" replace={true}/>
            case STATES.ACCEPTED:
            default:
                return <Component/>
        }
    }

    return(
        determineState()
    )
}

export default ProtectedRoute