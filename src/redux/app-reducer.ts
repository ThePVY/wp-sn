import { ActionT, IWrapperF } from '@/types/common-types'
import { reset } from 'redux-form'
import { ThunkAction } from 'redux-thunk'
import { thunkCreator as authTC } from './auth-reducer'
import { thunkCreator as profileTC } from './profile-reducer'
import { RootStateT } from './store-redux'

const SET_INITIALIZED = 'app/SET_INITIALIZED'
const SET_SPIN_LOGO = 'app/SET_SPIN_LOGO'

type SetInitializedT = ActionT<typeof SET_INITIALIZED, null>
type SetSpinLogoT = ActionT<typeof SET_SPIN_LOGO, boolean>

type AppActionT = SetInitializedT | SetSpinLogoT

export const actionCreator = {
  setInitialized: (): SetInitializedT => ({ type: SET_INITIALIZED }),
  setSpinLogo: (spin: boolean): SetSpinLogoT => ({ type: SET_SPIN_LOGO, payload: spin }),
}

type ThunkActionT<R> = ThunkAction<R, RootStateT, undefined, AppActionT>

export const initializeApp = (): ThunkActionT<Promise<void>> => async dispatch => {
  try {
    const userId = await dispatch(authTC.getAuthData())

    await dispatch(profileTC.getProfileData(userId))
    await dispatch(profileTC.getProfileStatus(userId))
    console.log('App Reducer loaded Status and Data')
    dispatch(actionCreator.setInitialized())
  } catch (err) {
    setTimeout(() => {
      console.log(err)
      console.log('Reinitialization...')
      dispatch(initializeApp)
    }, 3000)
  }
}

export const spinLogoOn = (dispatchWrapper: IWrapperF): ThunkActionT<void> => (
  dispatch,
  getState
) => {
  dispatchWrapper()
  dispatch(actionCreator.setSpinLogo(true))
  setTimeout(() => {
    console.log(getState().app.spinLogo)
    dispatch(actionCreator.setSpinLogo(false))
  }, 1500)
}

export const resetForm = (form: string): ThunkActionT<void> => dispatch => dispatch(reset(form))

const initialState = {
  initialized: false,
  spinLogo: false,
}
export type AppStateT = typeof initialState

export const appReducer = (state = initialState, action: AppActionT): AppStateT => {
  switch (action.type) {
    case SET_INITIALIZED:
      return { ...state, initialized: true }
    case SET_SPIN_LOGO:
      return { ...state, spinLogo: action.payload }
    default:
      return state
  }
}

/*---------------------------------------------------------------------------------*/
