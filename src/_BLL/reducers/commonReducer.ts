
const initialState = {
    currentNavPath: ''
}

type InitialStateType = typeof initialState

export const commonReducer = (state = initialState, action: commonActionsType):InitialStateType => {
    return state
}


type AC<T> = T extends { [key: string]: (...args: any[]) => infer U } ? U : never;
type commonActionsType = AC<typeof commonActions>


export const commonActions = {
    setCurrentNavPath: (path: string) => ({type: 'SET_CURRENT_PATH', path}) as const
}