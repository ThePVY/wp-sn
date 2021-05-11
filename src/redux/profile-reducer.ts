import { UserPhotosDT, UserProfileDT } from '@/types/api-types';
import { ActionT } from '@/types/common-types';
import { ProfileStatusFormDT } from '@/types/form-types';
import { ThunkAction } from 'redux-thunk';
import { profileAPI } from '../api/profile-api';
import { RootStateT } from './store-redux';

const ADD_POST = 'profile/ADD-POST'
const DELETE_POST = 'profile/DELETE_POST'
const SET_USER_DATA = 'profile/SET_USER_DATA'
const SET_PROFILE_STATUS = 'profile/SET_PROFILE_STATUS'
const SET_USER_ID = 'profile/SET_USER_ID'

type AddPostT = ActionT<typeof ADD_POST, string>
type DeletePostT = ActionT<typeof DELETE_POST, number>
type SetUserDataT = ActionT<typeof SET_USER_DATA, UserProfileDT>
type SetProfileStatusT = ActionT<typeof SET_PROFILE_STATUS, string>
type SetUserIdT = ActionT<typeof SET_USER_ID, number>


export type ProfileActionT = AddPostT | DeletePostT | SetUserDataT | SetProfileStatusT | SetUserIdT

export const actionCreator = {
    posts: {
        addPost: (post: string): AddPostT => ({ type: ADD_POST, payload: post }),
        deletePost: (postId: number): DeletePostT => ({ type: DELETE_POST, payload: postId }),
    },
    info: {
        setUserProfileData: (data: UserProfileDT): SetUserDataT => ({ type: SET_USER_DATA, payload: data }),
        setProfileStatus: (status: string): SetProfileStatusT => ({ type: SET_PROFILE_STATUS, payload: status })
    },
    common: {
        setUserId: (userId: number): SetUserIdT => ({ type: SET_USER_ID, payload: userId })
    }
}

export const getProfileAC = () => actionCreator


type ThunkActionT<R = void> = ThunkAction<R, RootStateT, undefined, ProfileActionT>

export const thunkCreator = {
    getProfileData(userId: number): ThunkActionT {
        return async dispatch => {
            if (!userId) return
            try {
                const data = await profileAPI.getProfileData(userId)
                dispatch(actionCreator.info.setUserProfileData(data))
                dispatch(actionCreator.common.setUserId(userId))
            }
            catch (err) {
                console.log(err)
            }
        }
    },
    getProfileStatus(userId: number): ThunkActionT {
        return async dispatch => {
            if (!userId) return
            try {
                const status = await profileAPI.getProfileStatus(userId)
                dispatch(actionCreator.info.setProfileStatus(status ? status : undefined))
            }
            catch (err) {
                console.log(err)
            }
        }
    },
    putProfileStatus(statusObj: ProfileStatusFormDT): ThunkActionT {
        return async dispatch => {
            if ('status' in statusObj === false) return
            try {
                const data = await profileAPI.putProfileStatus(statusObj)
                if (data.resultCode === 0) {
                    dispatch(actionCreator.info.setProfileStatus(statusObj.status))
                }
            }
            catch (err) {
                console.log(err)
            }
        }
    },
    uploadProfilePhoto(photo: UserPhotosDT, authId: number): ThunkActionT {
        return async dispatch => {
            try {
                const data = await profileAPI.putProfileImage(photo)
                if (data.resultCode === 0) {
                    dispatch(thunkCreator.getProfileData(authId))
                }
            }
            catch (err) {
                console.log(err)
            }
        }
    },
    putProfileInfo(info: UserProfileDT): ThunkActionT {
        return async (dispatch, getState) => {
            try {
                const userId = getState().auth.data.id
                const obj = { ...info, userId }
                const data = await profileAPI.putProfileInfo(obj)
                if (data.resultCode === 0) {
                    const profileData = await profileAPI.getProfileData(userId)
                    dispatch(actionCreator.info.setUserProfileData(profileData))
                }
                else {
                    console.log(data)
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
    posts: {
        posts: [
            { id: 0, message: 'Hello', likesCount: 0 },
            ...[...new Array(30)].map((item, idx) => (
                { id: idx + 1, message: 'Hello Hello Hello Hello Hello Hello Hello Hello Hello', likesCount: 0 }
            ))
        ],
    },
    info: {
        data: undefined as UserProfileDT,
        status: undefined as string
    },
    userId: undefined as number
}

type ProfileStateT = typeof initialState


//for changing state in store
export const profileReducer = (state = initialState, action: ProfileActionT): ProfileStateT => {
    switch (action.type) {
        case ADD_POST:
            return addPost(state, action.payload)

        case DELETE_POST:
            return deletePost(state, action.payload)

        case SET_USER_DATA:
            return { ...state, info: { ...state.info, data: action.payload } }

        case SET_USER_ID:
            return { ...state, userId: action.payload }

        case SET_PROFILE_STATUS:
            return { ...state, info: { ...state.info, status: action.payload } }

        default:
            return state
    }
}


/*---------------------------------------------------------------------------------*/

const addPost = (state: ProfileStateT, payload: string): ProfileStateT => {
    const posts = state.posts.posts
    const newPost = {
        id: posts[posts.length - 1].id + 1,
        message: payload,
        likesCount: 0
    }

    return {
        ...state, posts: { posts: [...posts, newPost] }
    }
}

const deletePost = (state: ProfileStateT, payload: number): ProfileStateT => {
    return {
        ...state, posts: { posts: state.posts.posts.filter((post) => post.id !== payload) }
    }
}
