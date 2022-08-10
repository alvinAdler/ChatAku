import "./FriendHolder_master.scss"

import AvatarHolder from "../AvatarHolder/AvatarHolder"

const FriendHolder = ({username="User", avatarName}) => {
  return (
    <div className="friend-holder-container">
        <AvatarHolder avatarName={avatarName}/>
        <span>{username}</span>
    </div>
  )
}

export default FriendHolder