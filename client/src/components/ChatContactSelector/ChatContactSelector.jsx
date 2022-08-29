import { useState } from 'react'
import { useSelector } from 'react-redux'
import { v4 as uuid } from 'uuid'
import { FaCheck } from 'react-icons/fa'

import "./ChatContactSelector_master.scss"

import SearchInput from '../SearchInput/SearchInput'
import BlackBanner from '../BlackBanner'
import ContactHolder from '../ContactHolder/ContactHolder'
import DefaultButton from '../Buttons'
import Checkbox from '../Checkbox/Checkbox'

const ChatContactSelector = ({ isVisible, onCloseChatAdder }) => {

    const friendsList = useSelector((store) => store.user.friendsList)
    const [focusedFriend, setFocusedFriend] = useState(friendsList.map((friend) => {
        const newFriend = {...friend}
        newFriend.isSelected = false
        return newFriend
    }))

    const handleChatCreation = () => {
        onCloseChatAdder()
    }

    const handleContactSelect = (friendId) => {
        setFocusedFriend((prevList) => prevList.map((friend) => {
            if(friend._id === friendId){
                const newFriend = structuredClone(friend)
                newFriend.isSelected = !newFriend.isSelected

                return newFriend
            }

            return friend
        }))
    }

    const handleContactSearch = (keyword) => {

    }

    return (
        <div className={`chat-contact-selector ${isVisible && "active"}`}>
            <div className="main-content">
                <SearchInput className="friend-search" onSearch={handleContactSearch}/>

                {focusedFriend.map((friend) => (
                    <div className='row-holder' key={uuid()}>
                        <Checkbox checked={friend.isSelected} onChange={() => handleContactSelect(friend._id)}/>
                        <ContactHolder user={friend} onClick={() => handleContactSelect(friend._id)}/>
                    </div>
                ))}

                <DefaultButton className="add-button" onClick={handleChatCreation}><FaCheck/></DefaultButton>
            </div>
            <BlackBanner onClick={onCloseChatAdder}/>
        </div>
    )
}

export default ChatContactSelector