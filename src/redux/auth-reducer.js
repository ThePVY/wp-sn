import { stopSubmit } from "redux-form"
import { authAPI } from "../api/auth-api"
import { initializeApp } from "./app-reducer"

const SET_AUTH_DATA = 'SET_AUTH_DATA'

//for construct action in components
export const actionCreator = {
    setAuthData: data => ({ type: SET_AUTH_DATA, data })
}

export const thunkCreator = {
    getAuthData() {
        return async dispatch => {
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
    signIn(jsonObj) {
        return async dispatch => {
            try {
                const data = await authAPI.signIn(jsonObj)
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
        return async dispatch => {
            try {
                const data = await authAPI.signOut()
                if (data.resultCode === 0) {
                    const authData = {
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

//initial value of state
const initialState = {
    isAuthorized: false,
    data: {
        id: undefined,
        login: undefined,
        email: undefined
    }
}

//for changing state in store
export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTH_DATA:
            return setAuthData(state, action.data)
        default:
            return state
    }
}


/*---------------------------------------------------------------------------------*/

const setAuthData = (state, data) => ({
    ...state,
    data: data.data,
    isAuthorized: data.resultCode === 0
})