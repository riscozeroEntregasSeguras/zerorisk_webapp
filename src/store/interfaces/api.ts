export interface ActionInputs {
    commit?: any,
    dispatch?: any,
    rootState: any,
    state: any
}

export interface ApiError {
    inputs: null | any
    valid: boolean
    message: string
    data: any
    error: {
        code: null | number
        message: string
        details: any
    }
}
