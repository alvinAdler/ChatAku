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

export const getAvatar = (avatarName) => {
    if(!avatarName || !Object.keys(AVATAR_MAPPING).includes(avatarName)) return ""

    return AVATAR_MAPPING[avatarName]
}

/** findOBP (Find Object Based on Property)
 * 
 * @param {Array} arr 
 * @param {String} property 
 * @param {String} target 
 * @returns Array
 * 
 * Given an array of objects, filter the array where a property of each object
 * match the given target
 */
export const findOBP = (arr, property, target) => {
    return arr.filter(item => {
        const regex = new RegExp(`${target}`, "gi")
        return item[property].match(regex) !== null
    })
}

export const generateArray = (start, end) => {
    let counter = -1
    return Array.from(new Array(end - start)).map((_) => {
        counter += 1
        return start + counter
    })
}

export const findChatOpponent = (activeChat, currentUsername) => {
    if(!activeChat) return
    for(let participant of activeChat.participants){
        if(participant.username !== currentUsername) return participant
    }
    return
}