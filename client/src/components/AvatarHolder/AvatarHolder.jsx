import "./AvatarHolder_master.scss"

import { getAvatar } from '../../utilities/utilityFunctions'

const AvatarHolder = ({avatarName="Avatar1"}) => {
  return (
    <img className="avatar-holder" src={getAvatar(avatarName)} alt={avatarName} />
  )
}

export default AvatarHolder