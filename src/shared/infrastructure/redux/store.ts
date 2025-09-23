import { configureStore, Reducer } from '@reduxjs/toolkit'
import {
    authApi,
    companyApi,
    userApi,
    systemOptionApi,
    scrapingCredentialApi,
} from '@shared/api'
import { authReducer } from './auth'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        [authApi.reducerPath]: authApi.reducer as Reducer,
        [companyApi.reducerPath]: companyApi.reducer as Reducer,
        [userApi.reducerPath]: userApi.reducer as Reducer,
        [systemOptionApi.reducerPath]: systemOptionApi.reducer as Reducer,
        [scrapingCredentialApi.reducerPath]: scrapingCredentialApi.reducer as Reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false })
            .concat(authApi.middleware)
            .concat(companyApi.middleware)
            .concat(userApi.middleware)
            .concat(systemOptionApi.middleware)
            .concat(scrapingCredentialApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch