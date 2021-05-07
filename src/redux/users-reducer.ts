import { UserDT } from '@/types/api-types'
import { ActionT } from '@/types/common-types'
import { Dispatch } from 'redux'
import { usersAPI } from '../api/users-api'

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

export type UsersActionsT =
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

export const getUsersAC = () => actionCreator

export const thunkCreator = {
  getUsers (p: number) {
    return async (dispatch: Dispatch<UsersActionsT>) => {
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
  setFollow (userId: number, followed: boolean) {
    return async (dispatch: Dispatch<UsersActionsT>) => {
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

//initial state of users page
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

export const usersReducer = (state = initialState, action: UsersActionsT): UsersStateT => {
  switch (action.type) {
    case FOLLOW_CLICK:
      return toggleFollow(state, action.payload)

    case SET_USERS:
      return setUsers(state, action.payload)

    case SHOW_MORE_CLICK:
      return state

    case SET_USERS_TOTAL_COUNT:
      return setUsersTotalCount(state, action.payload)

    case SET_SELECTED_PAGE:
      return setSelectedPage(state, action.payload)

    case TOGGLE_IS_FETCHING:
      return toggleIsFetching(state, action.payload)

    case SET_LOADINGS:
      return setLoadings(state, action.payload)

    default:
      return state
  }
}

/*-----------------------------------------------------------------------------------------------*/

const toggleFollow = (state: UsersStateT, userId: number): UsersStateT => ({
  ...state,
  usersList: state.usersList.map(user => {
    return user.id === userId ? { ...user, followed: !user.followed } : user
  }),
})

const setUsers = (state: UsersStateT, users: UserDT[]): UsersStateT => ({
  ...state,
  usersList: [...users],
})

const setUsersTotalCount = (state: UsersStateT, count: number): UsersStateT => ({
  ...state,
  usersTotalCount: count,
  pagesTotalCount: Math.ceil(count / state.pageSize),
})

const setSelectedPage = (state: UsersStateT, selectedPage: number): UsersStateT => ({
  ...state,
  selectedPage,
})

const toggleIsFetching = (state: UsersStateT, isFetching: boolean): UsersStateT => ({
  ...state,
  isFetching,
})

const setLoadings = (state: UsersStateT, { userId, isLoading }: LoadingsT): UsersStateT => ({
  ...state,
  loadings: isLoading
    ? [...state.loadings, userId]
    : state.loadings.filter(item => item !== userId),
})
