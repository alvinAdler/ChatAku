import avatar1 from '../images/avatars/peep-16.svg'
import avatar2 from '../images/avatars/peep-47.svg'
import avatar3 from '../images/avatars/peep-72.svg'
import avatar4 from '../images/avatars/peep-99.svg'
import avatar5 from '../images/avatars/peep-102.svg'

const AVATAR_MAPPING = {
	"Avatar1": avatar1,
	"Avatar2": avatar2,
	"Avatar3": avatar3,
	"Avatar4": avatar4,
	"Avatar5": avatar5,
}

const getAvatar = (avatarName) => {
    if(!avatarName || !Object.keys(AVATAR_MAPPING).includes(avatarName)) return ""

    return AVATAR_MAPPING[avatarName]
}

export { getAvatar }