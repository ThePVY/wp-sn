import { UserDT } from '@/types/api-types'
import { ActionT } from '@/types/common-types'
import { ThunkAction } from 'redux-thunk'
import { usersAPI } from '../api/users-api'
import { RootStateT } from './store-redux'

const FOLLOW_CLICK = 'FOLLOW_CLICK'
const SHOW_MORE_CLICK = 'SHOW_MORE_CLICK'
const SET_USERS = 'SET_USERS'
const SET_USERS_TOTAL_COUNT = 'SET_USERS_TOTAL_COUNT'
const SET_SELECTED_PAGE = 'SET_SELECTED_PAGE'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'
const SET_LOADINGS = 'SET_LOADINGS'

type FollowClickT = ActionT<typeof FOLLOW_CLICK, number>
type ShowMoreClickT = ActionT<typeof SHOW_MORE_CLICK, null>
type SetUsersT = ActionT<typeof SET_USERS, UserDT[]>
type SetUsersTotalCountT = ActionT<typeof SET_USERS_TOTAL_COUNT, number>
type SetSelectedPageT = ActionT<typeof SET_SELECTED_PAGE, number>
type ToggleIsFetchingT = ActionT<typeof TOGGLE_IS_FETCHING, boolean>
type SetLoadingsT = ActionT<typeof SET_LOADINGS, LoadingsT>

type LoadingsT = { userId: number; isLoading: boolean }

export type UsersActionT =
  | FollowClickT
  | ShowMoreClickT
  | SetUsersT
  | SetUsersTotalCountT
  | SetSelectedPageT
  | ToggleIsFetchingT
  | SetLoadingsT

export const actionCreator = {
  usersList: {
    toggleFollow: (userId: number): FollowClickT => ({
      type: FOLLOW_CLICK,
      payload: userId,
    }),
    showMoreClick: (): ShowMoreClickT => ({ type: SHOW_MORE_CLICK }),
    setUsers: (users: UserDT[]): SetUsersT => ({
      type: SET_USERS,
      payload: users,
    }),
    setUsersCount: (count: number): SetUsersTotalCountT => ({
      type: SET_USERS_TOTAL_COUNT,
      payload: count,
    }),
    setSelectedPage: (number: number): SetSelectedPageT => ({
      type: SET_SELECTED_PAGE,
      payload: number,
    }),
    toggleIsFetching: (isFetching: boolean): ToggleIsFetchingT => ({
      type: TOGGLE_IS_FETCHING,
      payload: isFetching,
    }),
    setLoadings: (userId: number, isLoading: boolean): SetLoadingsT => ({
      type: SET_LOADINGS,
      payload: { userId, isLoading },
    }),
  },
}

export type UsersACT = typeof actionCreator

export const getUsersAC = (): UsersACT => actionCreator

type ThunkActionT<R = void> = ThunkAction<R, RootStateT, undefined, UsersActionT>

export const thunkCreator = {
  getUsers (p: number): ThunkActionT {
    return async dispatch => {
      try {
        dispatch(actionCreator.usersList.toggleIsFetching(true))
        const data = await usersAPI.getUsers(p)
        dispatch(actionCreator.usersList.setUsers(data.items))
        dispatch(actionCreator.usersList.setUsersCount(data.totalCount))
        dispatch(actionCreator.usersList.toggleIsFetching(false))
      } catch (err) {
        dispatch(actionCreator.usersList.toggleIsFetching(false))
        console.log(err)
      }
    }
  },
  setFollow (userId: number, followed: boolean): ThunkActionT {
    return async dispatch => {
      try {
        dispatch(actionCreator.usersList.toggleIsFetching(true))
        dispatch(actionCreator.usersList.setLoadings(userId, true))
        const data = await usersAPI.followRequest(userId, followed)
        dispatch(actionCreator.usersList.toggleIsFetching(false))
        dispatch(actionCreator.usersList.setLoadings(userId, false))
        if (!data.resultCode) dispatch(actionCreator.usersList.toggleFollow(userId))
      } catch (err) {
        dispatch(actionCreator.usersList.toggleIsFetching(false))
        dispatch(actionCreator.usersList.setLoadings(userId, false))
        console.log(err)
      }
    }
  },
}

const initialState = {
  usersList: [] as UserDT[],
  showMore: false,
  pageSize: 10,
  usersTotalCount: 0,
  pagesTotalCount: 1,
  selectedPage: 1,
  isFetching: false,
  loadings: [] as number[],
}

export type UsersStateT = typeof initialState

export const usersReducer = (state = initialState, action: UsersActionT): UsersStateT => {
  switch (action.type) {
    case FOLLOW_CLICK:
      return {
        ...state,
        usersList: state.usersList.map(user =>
          user.id === action.payload ? { ...user, followed: !user.followed } : user
        ),
      }

    case SET_USERS:
      return { ...state, usersList: [...action.payload] }

    case SHOW_MORE_CLICK:
      return state

    case SET_USERS_TOTAL_COUNT:
      return {
        ...state,
        usersTotalCount: action.payload,
        pagesTotalCount: Math.ceil(action.payload / state.pageSize),
      }

    case SET_SELECTED_PAGE:
      return { ...state, selectedPage: action.payload }

    case TOGGLE_IS_FETCHING:
      return { ...state, isFetching: action.payload }

    case SET_LOADINGS:
      return {
        ...state,
        loadings: action.payload.isLoading
          ? [...state.loadings, action.payload.userId]
          : state.loadings.filter(item => item !== action.payload.userId),
      }

    default:
      return state
  }
}

/*-----------------------------------------------------------------------------------------------*/
