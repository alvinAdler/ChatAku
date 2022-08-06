import { useState } from 'react'
import { FiUser, FiPlus } from 'react-icons/fi'

import "./AvatarSelector_master.scss"

import avatar1 from '../../images/avatars/peep-16.svg'
import avatar2 from '../../images/avatars/peep-47.svg'
import avatar3 from '../../images/avatars/peep-72.svg'
import avatar4 from '../../images/avatars/peep-99.svg'
import avatar5 from '../../images/avatars/peep-102.svg'

const AVATAR_MAPPING = {
	"Avatar1": avatar1,
	"Avatar2": avatar2,
	"Avatar3": avatar3,
	"Avatar4": avatar4,
	"Avatar5": avatar5,
}

const AvatarSelector = ({value, onChange, ...attrs}) => {

	const [isAvatarShown, setIsAvatarShown] = useState(false)

	const handleAvatarChange = (avatarName) => {
		console.log(avatarName)
		setIsAvatarShown((prevState) => !prevState)
		onChange(avatarName)
	}

	return (
		<div className='avatar-selection-container' {...attrs}>
			<button type="button" className="avatar-selector-button" onClick={() => setIsAvatarShown((prevState) => !prevState)}>
				{value === null || undefined || "" ?
				<>
					<FiUser/>
					<FiPlus className="add-icon"/>
				</>
				:
				<img src={[AVATAR_MAPPING[value]]} alt={`${value}`}/>
				}

			</button>
			<div className={`avatar-options ${isAvatarShown && "show-options"}`}>
				<button type="button" onClick={() => handleAvatarChange("Avatar1")}><img src={avatar1} alt="Avatar 1" /></button>
				<button type="button" onClick={() => handleAvatarChange("Avatar2")}><img src={avatar2} alt="Avatar 2" /></button>
				<button type="button" onClick={() => handleAvatarChange("Avatar3")}><img src={avatar3} alt="Avatar 3" /></button>
				<button type="button" onClick={() => handleAvatarChange("Avatar4")}><img src={avatar4} alt="Avatar 4" /></button>
				<button type="button" onClick={() => handleAvatarChange("Avatar5")}><img src={avatar5} alt="Avatar 5" /></button>
			</div>
		</div>
	)
}

export default AvatarSelector