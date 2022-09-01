import {configureStore} from '@reduxjs/toolkit';
import appDataReducer from './appDataSlice';

export const appData = configureStore({
    reducer: {
        appData: appDataReducer
    },
    devTools: process.env.NODE_ENV === 'development'
})

export type RootState = ReturnType<typeof appData.getState>
export type AppDispatch = typeof appData.dispatch;