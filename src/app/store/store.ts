import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query/react'
import { userApi } from '../../entities/auth/userApi'
import authSlice from '../../entities/auth/authSlice'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { companyApi } from '../../entities/chats/companyApi'
import { channelApi } from '../../entities/channel/channelApi'
import chatSlice from '../../entities/chats/chatSlice'


// const rootReducer = combineReducers({
//     [userApi.reducerPath]: userApi.reducer,
//     auth: authReducer,
// })

export const store = configureStore({
    reducer: {
        [userApi.reducerPath]: userApi.reducer,
        [companyApi.reducerPath]: companyApi.reducer,
        [channelApi.reducerPath]: channelApi.reducer,
        auth: authSlice,
        chats: chatSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(userApi.middleware).concat(companyApi.middleware).concat(channelApi.middleware),
})

// export type RootState = ReturnType<typeof rootReducer>;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>() 

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// export const useAppDispatch = () => useDispatch<AppDispatch>();
// export type AppDispatch = AppStore['dispatch']


// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization

setupListeners(store.dispatch)