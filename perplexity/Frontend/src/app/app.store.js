import {configureStore} from '@reduxjs/toolkit'
import authReducer from '../app/features/auth/auth.slice'
import chatReducer from '../app/features/chat/chat.slice'

export const store = configureStore({
    reducer:{
        auth: authReducer,
        chat: chatReducer,
    }
})