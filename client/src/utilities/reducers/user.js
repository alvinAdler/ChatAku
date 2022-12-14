import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: "user",
    initialState: {
        info: {},
        friendsList: [],
        requestList: [],
        activeChatId: ""
    },
    reducers: {
        modifyFriendsList: (user, action) => {

            const { targetUser, actionType } = action.payload

            switch(actionType){
                case "ADD":
                    user.friendsList.push(targetUser)
                    break;
                case "REMOVE":
                    user.friendsList = user.friendsList.filter((user) => user._id !== targetUser._id)
                    break;
            }
        },

        modifyRequestList: (user, action) => {
            const { targetUser, actionType } = action.payload

            switch(actionType){
                case "ADD":
                    user.requestList.push(targetUser)
                    break;
                case "REMOVE":
                    user.requestList = user.requestList.filter((user) => user._id !== targetUser._id)
                    break;
            }
        },

        setFriendsList: (user, action) => {
            const { friendsList } = action.payload

            user.friendsList = friendsList
        },

        setRequestList: (user, action) => {
            const { requestList } = action.payload

            user.requestList = requestList
        },
        setUserInfo: (user, action) => {
            const { userInfo } = action.payload

            user.info = userInfo
        },
        setActiveChatId: (user, action) => {
            const { chatId } = action.payload

            if(chatId === undefined) return

            user.activeChatId = chatId
            return user
        },
        pushChat: (user, action) => {
            const { data } = action.payload

            const targetedDataIndex = user.info.chatList.indexOf(user.info.chatList.find(chat => chat._id === user.activeChatId))
            if(targetedDataIndex === -1) return

            user.info.chatList[targetedDataIndex].chatHistory.push(data)
            return user
        },
        pushChatList: (user, action) => {
            const { chat } = action.payload

            user.info.chatList.push(chat)
            return user
        },
        deleteChatList: (user, action) => {
            const { chatId } = action.payload

            user.info.chatList.splice(user.info.chatList.indexOf(user.info.chatList.find((chat) => chat._id === chatId)), 1)
            return user
        }
    }
})

const { actions, reducer } = userSlice

export const { 
    modifyFriendsList, modifyRequestList,
    setFriendsList, setRequestList, setUserInfo, setActiveChatId, pushChat, pushChatList, deleteChatList
} = actions
export default reducer