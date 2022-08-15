import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: "user",
    initialState: {
        friendsList: [],
        requestList: [],
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

        },

        setFriendsList: (user, action) => {
            const { friendsList } = action.payload

            user.friendsList = friendsList
        },

        setRequestList: (user, action) => {
            const { requestList } = action.payload

            user.requestList = requestList
        }
    }
})

const { actions, reducer } = userSlice

export const { 
    modifyFriendsList, modifyRequestList,
    setFriendsList, setRequestList
} = actions
export default reducer