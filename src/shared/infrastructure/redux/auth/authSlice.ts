import { createSlice } from '@reduxjs/toolkit'
import { setStateShared } from '../actions'
import { AuthUserDTO, CompanyDTO, ResponseSignIn, SystemOptionENTITY } from 'logiflowerp-sdk'

const authUser = localStorage.getItem('authUser')
let user = new AuthUserDTO()
let company = new CompanyDTO()
let dataSystemOptions: SystemOptionENTITY[] = []
if (authUser) {
    const {
        user: _user,
        dataSystemOptions: _dataSystemOptions,
        company: _company,
        tags: _tags
    } = JSON.parse(authUser) as ResponseSignIn
    user = _user
    dataSystemOptions = _dataSystemOptions
    company = _company
}

export const initialState = {
    user,
    isAuthenticated: !!authUser,
    dataSystemOptions,
    company,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setState: setStateShared<typeof initialState>
    }
})

export const authActions = authSlice.actions
export const authReducer = authSlice.reducer
