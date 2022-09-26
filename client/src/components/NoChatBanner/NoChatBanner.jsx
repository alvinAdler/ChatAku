import "./NoChatBanner_master.scss"
import { ReactComponent as NoChatBannerLogo } from "../../images/nochat-banner.svg"

const NoChatBanner = () => {
    return (
        <div className="nochat-banner-container">
            <NoChatBannerLogo/>
            <p>No chat for now. Go ahead and start a new one!</p>
        </div>
    )
}

export default NoChatBanner