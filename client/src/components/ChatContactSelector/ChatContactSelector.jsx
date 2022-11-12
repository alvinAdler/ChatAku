import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { v4 as uuid } from 'uuid'
import { FaCheck } from 'react-icons/fa'
import Cookies from 'js-cookie'

import "./ChatContactSelector_master.scss"

import customAxios from '../../utilities/customAxios'
import { pushChatList } from '../../utilities/reducers/user'

import SearchInput from '../SearchInput/SearchInput'
import BlackBanner from '../BlackBanner'
import ContactHolder from '../ContactHolder/ContactHolder'
import DefaultButton from '../Buttons'
import Checkbox from '../Checkbox/Checkbox'

const ChatContactSelector = ({ isVisible, onCloseChatAdder }) => {

    const friendsList = useSelector((store) => store.user.friendsList)
    const chatList = useSelector((store) => store.user.info.chatList)

    const [focusedFriend, setFocusedFriend] = useState(friendsList.map((friend) => {
        const newFriend = {...friend}
        newFriend.isSelected = false
        return newFriend
    }))

    const dispatch = useDispatch()

    useEffect(() => {
        setFocusedFriend((prevState) => prevState.map((friend) => {
            const newFriend = {...friend}
            newFriend.isSelected = false
            return newFriend
        }))
    }, [chatList])

    const handleChatCreation = () => {

        const targetedFriends = focusedFriend.filter((friend) => friend.isSelected).map((friend) => {
            const {isSelected, ...rest} = friend
            return rest
        })

        customAxios({
            method: "POST",
            url: "/users/addChat",
            headers: {
                "Authorization": `Bearer ${Cookies.get("authToken")}`
            },
            data: {
                targets: targetedFriends
            }
        })
        .then((res) => {
            if(res.status !== 200 && res.status !== 201) return
            console.log(res)
            dispatch(pushChatList({chat: res.data.room}))
        })
        .catch((err) => {
            console.error(err)
        })
        .finally(() => {
            setFocusedFriend((prevState) => prevState.map((item) => {
                const newFriend = {...item}
                newFriend.isSelected = false
                return newFriend
            }))
            onCloseChatAdder()
        })
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
                        <ContactHolder
                        chatTitle={friend.username}
                        chatAvatar={friend.avatarName} 
                        onClick={() => handleContactSelect(friend._id)}
                        />
                    </div>
                ))}

                <DefaultButton className="add-button" onClick={handleChatCreation}><FaCheck/></DefaultButton>
            </div>
            <BlackBanner onClick={onCloseChatAdder}/>
        </div>
    )
}

export default ChatContactSelector