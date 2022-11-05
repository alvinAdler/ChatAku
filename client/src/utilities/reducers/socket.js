import { createSlice } from "@reduxjs/toolkit";
import { io } from "socket.io-client";

const socketSlice = createSlice({
    name: "socket",
    initialState: {
        socket: null
    },
    reducers: {
        connectSocket: (state) => {
            state.socket = io("http://localhost:5000")
        },
        disconnectSocket: (state) => {
            state.socket.disconnect()
        }
    }
})

const { actions, reducer } = socketSlice

export const {
    connectSocket, disconnectSocket
} = actions

export default reducer

