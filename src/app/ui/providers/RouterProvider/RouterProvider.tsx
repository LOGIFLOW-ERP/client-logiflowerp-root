import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ErrorPage } from '../../pages'
import { lazy } from 'react'
import { protectedLoader, publicLoader } from '@app/application'
import { buildRoutes } from './index'

const LayoutAuth = lazy(() => import('../../../../contextRoot/processes/auth/ui/pages/LayoutAuth').then(mo => ({ default: mo.LayoutAuth })))
const ResetPassword = lazy(() => import('../../../../contextRoot/processes/auth/ui/pages/ResetPassword').then(mo => ({ default: mo.ResetPassword })))
const LoginForm = lazy(() => import('../../../../contextRoot/processes/auth/ui/components/LoginForm').then(mo => ({ default: mo.LoginForm })))
const SignUpForm = lazy(() => import('../../../../contextRoot/processes/auth/ui/components/SignUpForm').then(mo => ({ default: mo.SignUpForm })))
const RequestPasswordResetForm = lazy(() => import('../../../../contextRoot/processes/auth/ui/components/RequestPasswordResetForm').then(mo => ({ default: mo.RequestPasswordResetForm })))
const LayoutHome = lazy(() => import('@shared/ui/pages/LayoutHome').then(mo => ({ default: mo.LayoutHome })))
const Dashboard = lazy(() => import('@shared/ui/pages/DashBoard').then(mo => ({ default: mo.Dashboard })))

const routes = buildRoutes()

const router = createBrowserRouter([
    {
        id: 'root',
        path: '/',
        errorElement: <ErrorPage />,
        children: [
            {
                loader: publicLoader,
                children: [
                    {
                        Component: LayoutAuth,
                        loader: publicLoader,
                        children: [
                            {
                                path: 'sign-in',
                                Component: LoginForm
                            },
                            {
                                path: 'sign-up',
                                Component: SignUpForm
                            },
                            {
                                path: 'request-password-reset',
                                Component: RequestPasswordResetForm
                            },
                        ]
                    },
                    {
                        path: 'reset-password',
                        Component: ResetPassword
                    },
                ]
            },
            {
                loader: protectedLoader,
                children: [
                    {
                        Component: LayoutHome,
                        children: [
                            {
                                index: true,
                                Component: Dashboard
                            },
                            ...routes
                        ]
                    }
                ]
            }
        ]
    }
])

export function AppRouterProvider() {
    return <RouterProvider router={router} />
}