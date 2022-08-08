import { useState, useEffect } from "react"
import { Navigate } from 'react-router-dom'
import Cookies from 'js-cookie'

import LoadingScreen from './LoadingScreen/LoadingScreen'
import customAxios from '../utilities/customAxios'

const STATES = {
    LOADING: "loading",
    REJECTED: "rejected",
    ACCEPTED: "accepted"
}

const ProtectedRoute = ({component: Component}) => {
    const [currentState, setCurrentState] = useState(STATES.LOADING)

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
                setCurrentState(STATES.ACCEPTED)
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