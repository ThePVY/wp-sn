import { Dispatch } from "react"
import { stopSubmit } from "redux-form"
import { authAPI } from "../api/auth-api"
import { initializeApp } from "./app-reducer"

const SET_AUTH_DATA = 'SET_AUTH_DATA'

interface IAuthReducerAC {
    setAuthData: (data: AuthMeResponseT) => AuthDataAction
}

type AuthDataAction = {
    type: typeof SET_AUTH_DATA,
    data: AuthMeResponseT
}

type AuthMeResponseT = {
    data: AuthDataT,
    resultCode: 1 | 0
}

type AuthDataT = {
    id: number,
    email: string,
    login: string
}

export const actionCreator: IAuthReducerAC = {
    setAuthData: data => ({ type: SET_AUTH_DATA, data })
}

export type LoginFormDataT = {
    login: string,
    password: string,
    rememberMe: boolean
}

export const thunkCreator = {
    getAuthData() {
        return async (dispatch: Dispatch<AuthDataAction>) => {
            try {
                const data = await authAPI.getAuthData()
                if (data.resultCode === 0) {
                    dispatch(actionCreator.setAuthData(data))
                    return data.data.id
                }
                else {
                    console.log('Get auth data result code = 1')
                }
            }
            catch (err) {
                console.log(err)
            }
        }
    },
    signIn(jsonData: LoginFormDataT) {
        return async (dispatch : any) => {
            try {
                const data = await authAPI.signIn(jsonData)
                if (data.resultCode === 0)
                    dispatch(initializeApp())
                else {
                    const errorMessage = data.messages ? data.messages[0] : 'Some Error'
                    dispatch(stopSubmit('login', { _error: errorMessage }))
                }
            }
            catch (err) {
                console.log(err)
            }
        }
    },
    signOut() {
        return async (dispatch: Dispatch<AuthDataAction>) => {
            try {
                const data = await authAPI.signOut()
                if (data.resultCode === 0) {
                    const authData : AuthMeResponseT = {
                        resultCode: 1,
                        data: {
                            id: undefined,
                            email: undefined,
                            login: undefined
                        }
                    }
                    dispatch(actionCreator.setAuthData(authData))
                }
            }
            catch (err) {
                console.log(err)
            }
        }
    }
}


const initialState = {
    isAuthorized: false, 
    data: {
        id: undefined,
        login: undefined,
        email: undefined
    } as AuthDataT
}

type AuthState = typeof initialState

export const authReducer = (state = initialState, action: AuthDataAction): AuthState => {
    switch (action.type) {
        case SET_AUTH_DATA:
            return {
                ...state,
                data: action.data.data,
                isAuthorized: action.data.resultCode === 0
            }
        default:
            return state
    }
}
