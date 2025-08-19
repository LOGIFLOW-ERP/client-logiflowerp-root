import { getBaseApiRoot } from './baseApi'
import { transformErrorResponse } from '../transformErrorResponse'
import {
    ChangePasswordDTO,
    CreateUserDTO,
    RequestPasswordResetDTO,
    ResetPasswordDTO,
    ResponseSignIn,
    SignInDTO,
} from 'logiflowerp-sdk'
import { instanceToPlain } from 'class-transformer'

const schema = 'processes'
const resource = 'rootauth'

const path = `${schema}/${resource}`

const baseApi = getBaseApiRoot(path)

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        signUp: builder.mutation<void, CreateUserDTO>({
            query: (body) => ({
                url: `/${schema}/${resource}/sign-up`,
                method: 'POST',
                body: instanceToPlain(body)
            }),
            transformErrorResponse
        }),
        requestPasswordReset: builder.mutation<void, RequestPasswordResetDTO>({
            query: (body) => ({
                url: `/${schema}/${resource}/request-password-reset`,
                method: 'POST',
                body: instanceToPlain(body),
            }),
            transformErrorResponse
        }),
        resetPassword: builder.mutation<void, ResetPasswordDTO>({
            query: (body) => ({
                url: `/${schema}/${resource}/reset-password`,
                method: 'POST',
                body: instanceToPlain(body),
            }),
            transformErrorResponse
        }),
        changePassword: builder.mutation<void, ChangePasswordDTO>({
            query: (body) => ({
                url: `/${schema}/${resource}/change-password`,
                method: 'POST',
                body: instanceToPlain(body),
            }),
            transformErrorResponse
        }),
        signIn: builder.mutation<ResponseSignIn, SignInDTO>({
            query: (body) => ({
                url: `/${schema}/${resource}/sign-in`,
                method: 'POST',
                body: instanceToPlain(body),
            }),
            transformResponse: (res: ResponseSignIn) => {
                localStorage.setItem('authUser', JSON.stringify(res))
                return res
            },
            transformErrorResponse
        }),
        signOut: builder.mutation<void, void>({
            query: () => ({
                url: `/${schema}/${resource}/sign-out`,
                method: 'POST',
            }),
            transformResponse: () => {
                localStorage.removeItem('authUser')
                localStorage.removeItem('selectedNode')
            },
            transformErrorResponse
        })
    })
})

export const {
    useSignUpMutation,
    useRequestPasswordResetMutation,
    useResetPasswordMutation,
    useSignInMutation,
    useSignOutMutation,
    useChangePasswordMutation
} = authApi
