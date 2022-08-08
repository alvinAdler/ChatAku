import "./LoadingScreen_master.scss"

import Spinner from 'react-bootstrap/Spinner'

const LoadingScreen = ({message="Please wait", isVisible=false}) => {
    return (
        <>
        {isVisible &&
        <div className="loading-screen-container">
            <p>{message}</p>
            <Spinner animation="border"/>
        </div>
        }
        </>
    )
}

export default LoadingScreen