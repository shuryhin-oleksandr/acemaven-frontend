

const initialState = {
    isAuth: false,
    isFetching: false
}

type InitialStateType = typeof initialState

export const authReducer = (state = initialState, action: commonAuthActions) :InitialStateType => {
    switch(action.type) {
        case "SET_IS_LOADING":
            return {
               ...state,
                isFetching: action.isFetching
            }
        case "SET_AUTH_USER":
            return {
                ...state,
                isAuth: action.isAuth
            }
        default: return state
    }
}

type AC<T> = T extends { [key: string]: (...args: any[]) => infer U } ? U : never;
type commonAuthActions = AC<typeof authActions>

export const authActions = {
    setAuthUser: (isAuth:boolean) => ({type: 'SET_AUTH_USER', isAuth} as const),
    setIsLoading: (isFetching: boolean) => ({type: 'SET_IS_LOADING', isFetching} as const)
}
