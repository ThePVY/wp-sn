import { AuthMeDT } from '@/types/api-types'
import { ActionT, ResponseT } from '@/types/common-types'
import { LoginFormDT } from '@/types/form-types'
import { stopSubmit } from 'redux-form'
import { ThunkAction } from 'redux-thunk'
import { authAPI } from '../api/auth-api'
import { initializeApp } from './app-reducer'
import { RootStateT } from './store-redux'

const SET_AUTH_DATA = 'SET_AUTH_DATA'

type SetAuthDataT = ActionT<typeof SET_AUTH_DATA, AuthMeResponseT>

export type AuthActionT = SetAuthDataT

type AuthMeResponseT = ResponseT<AuthMeDT>

export const actionCreator = {
  setAuthData: (payload: AuthMeResponseT): SetAuthDataT => ({ type: SET_AUTH_DATA, payload }),
}

export type AuthACT = typeof actionCreator
type ThunkActionT<R = void> = ThunkAction<Promise<R>, RootStateT, undefined, AuthActionT>

export const thunkCreator = {
  getAuthData (): ThunkActionT<Promise<number>> {
    return async dispatch => {
      try {
        const data = await authAPI.getAuthData()
        if (data.resultCode === 0) {
          dispatch(actionCreator.setAuthData(data))
          return data.data.id
        } else {
          console.log('Get auth data result code = 1')
        }
      } catch (err) {
        console.log(err)
      }
    }
  },
  signIn (jsonData: LoginFormDT): ThunkActionT {
    return async dispatch => {
      try {
        const data = await authAPI.signIn(jsonData)
        if (data.resultCode === 0) dispatch(initializeApp())
        else {
          const errorMessage = data.messages ? data.messages[0] : 'Some Error'
          dispatch(stopSubmit('login', { _error: errorMessage }))
        }
      } catch (err) {
        console.log(err)
      }
    }
  },
  signOut (): ThunkActionT {
    return async dispatch => {
      try {
        const data = await authAPI.signOut()
        if (data.resultCode === 0) {
          const authData: AuthMeResponseT = {
            resultCode: 1,
            data: {
              id: undefined,
              email: undefined,
              login: undefined,
            },
          }
          dispatch(actionCreator.setAuthData(authData))
        }
      } catch (err) {
        console.log(err)
      }
    }
  },
}

const initialState = {
  isAuthorized: false,
  data: {
    id: undefined,
    login: undefined,
    email: undefined,
  } as AuthMeDT,
}

export type AuthStateT = typeof initialState

export const authReducer = (state = initialState, action: AuthActionT): AuthStateT => {
  switch (action.type) {
    case SET_AUTH_DATA:
      return {
        ...state,
        data: action.payload.data,
        isAuthorized: action.payload.resultCode === 0,
      }
    default:
      return state
  }
}
