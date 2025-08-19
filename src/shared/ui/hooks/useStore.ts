import { AppDispatch, RootState } from '@shared/infrastructure/redux'
import { authActions } from '@shared/infrastructure/redux/auth/authSlice'
import { useDispatch, useSelector } from 'react-redux'

const actionCreators = {
    auth: authActions,
} as const

export function useStore<T extends keyof typeof actionCreators>(sliceName: T) {

    const state = useSelector((state: RootState) => state[sliceName])

    const dispatch = useDispatch<AppDispatch>()
    const actions = actionCreators[sliceName]

    const setState = (payload: Partial<typeof state>) => {
        dispatch(actions.setState(payload))
    }

    return {
        state,
        setState,
        actions
    }

}