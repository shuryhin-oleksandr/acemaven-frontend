
const initialState = {
    currentNavPath: ''
}

type InitialStateType = typeof initialState

export const commonReducer = (state = initialState, action: commonActionsType):InitialStateType => {
    switch (action.type) {
        case "SET_CURRENT_PATH":
            return {
                ...state,
                currentNavPath: action.path
            }
    }
    return state
}


type AC<T> = T extends { [key: string]: (...args: any[]) => infer U } ? U : never;
type commonActionsType = AC<typeof commonActions>


export const commonActions = {
    setCurrentNavPath: (path: string) => ({type: 'SET_CURRENT_PATH', path} as const),
    saveFirstData: (values: Array<string>) => ({type: 'SAVE_FIRST_DATA', values} as const)
}