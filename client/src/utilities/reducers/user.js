import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: "user",
    initialState: {
        
    },
    reducers: {
        login: (user, action) => {
            console.log("Logging the user in")
        }
    }
})

const { actions, reducer } = userSlice

export const { login } = actions
export default reducer