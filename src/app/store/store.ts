import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query/react'
import { userApi } from '../../entities/user/userApi'


const rootReducer = combineReducers({
    [userApi.reducerPath]: userApi.reducer,
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(userApi.middleware),
})

export type RootState = ReturnType<typeof rootReducer>;
// export type AppStore = ReturnType<typeof store>;
// export type AppDispatch = AppStore['dispatch'];

// export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
// export const useAppSelector = useSelector.withTypes<RootState>()

// export const store = configureStore({
//     reducer: {
//         // Add the generated reducer as a specific top-level slice
//         [userApi.reducerPath]: userApi.reducer,
//     },
//     // Adding the api middleware enables caching, invalidation, polling,
//     // and other useful features of `rtk-query`.
//     middleware: (getDefaultMiddleware) =>
//         getDefaultMiddleware().concat(userApi.middleware),
// })

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization

setupListeners(store.dispatch)