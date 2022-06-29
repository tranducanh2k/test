import { configureStore } from '@reduxjs/toolkit'
import uiReducer from '../redux/uiSlice'

export const store = configureStore({
    reducer: { 
        ui: uiReducer
    },
})