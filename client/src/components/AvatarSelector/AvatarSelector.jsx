import { useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { FiUser, FiPlus } from 'react-icons/fi'

import "./AvatarSelector_master.scss"

import avatar1 from '../../images/avatars/peep-16.svg'
import avatar2 from '../../images/avatars/peep-47.svg'
import avatar3 from '../../images/avatars/peep-72.svg'
import avatar4 from '../../images/avatars/peep-99.svg'
import avatar5 from '../../images/avatars/peep-102.svg'

const AvatarSelector = ({...attrs}) => {

	const [isAvatarShown, setIsAvatarShown] = useState(false)

	const handleAvatarChange = (avatarName) => {
		console.log(avatarName)
		setIsAvatarShown((prevState) => !prevState)
	}

	return (
		<div className='avatar-selection-container' {...attrs}>
			<button className="avatar-selector-button" onClick={() => setIsAvatarShown((prevState) => !prevState)}>
				<FiUser/>
				<FiPlus className="add-icon"/>
			</button>
			<div className={`avatar-options ${isAvatarShown && "show-options"}`}>
				<button onClick={() => handleAvatarChange("Avatar 1")}><img src={avatar1} alt="Avatar 1" /></button>
				<button onClick={() => handleAvatarChange("Avatar 2")}><img src={avatar2} alt="Avatar 2" /></button>
				<button onClick={() => handleAvatarChange("Avatar 3")}><img src={avatar3} alt="Avatar 3" /></button>
				<button onClick={() => handleAvatarChange("Avatar 4")}><img src={avatar4} alt="Avatar 4" /></button>
				<button onClick={() => handleAvatarChange("Avatar 5")}><img src={avatar5} alt="Avatar 5" /></button>
			</div>
		</div>
	)
}

export default AvatarSelector