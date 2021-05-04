import { profileAPI } from '../api/profile-api';

const ADD_POST = 'profile/ADD-POST'
const DELETE_POST = 'profile/DELETE_POST'
const SET_USER_DATA = 'profile/SET_USER_DATA'
const SET_PROFILE_STATUS = 'profile/SET_PROFILE_STATUS'
const SET_USER_ID = 'profile/SET_USER_ID'

//for construct action in components
export const actionCreator = {
    posts: {
        addPost: (post) => ({ type: ADD_POST, post }),
        deletePost: (postId) => ({ type: DELETE_POST, postId }),
    },
    info: {
        setUserProfileData: data => ({ type: SET_USER_DATA, data }),
        setProfileStatus: status => ({ type: SET_PROFILE_STATUS, status })
    },
    common: {
        setUserId: (userId) => ({ type: SET_USER_ID, userId })
    }
}

export const getProfileAC = () => actionCreator


export const thunkCreator = {
    getProfileData(userId) {
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
    getProfileStatus(userId) {
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
    putProfileStatus(statusObj) {
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
    uploadProfilePhoto(photo, authId) {
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
    putProfileInfo(info) {
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
            { id: 1, message: 'Hello Hello Hello Hello Hello Hello Hello Hello Hello', likesCount: 0 },
            {
                id: 2, message: `'Hello Hello Hello Hello Hello Hello Hello Hello Hello
                Hello Hello Hello Hello Hello Hello Hello Hello Hello'
                Hello Hello Hello Hello Hello Hello Hello Hello Hello`, likesCount: 0
            },
            {
                id: 3, message: `'Hello Hello Hello Hello Hello Hello Hello Hello Hello
                Hello Hello Hello Hello Hello Hello Hello Hello Hello'
                Hello Hello Hello Hello Hello Hello Hello Hello Hello`, likesCount: 0
            },
            {
                id: 4, message: `'Hello Hello Hello Hello Hello Hello Hello Hello Hello
                Hello Hello Hello Hello Hello Hello Hello Hello Hello'
                Hello Hello Hello Hello Hello Hello Hello Hello Hello`, likesCount: 0
            },
            {
                id: 5, message: `'Hello Hello Hello Hello Hello Hello Hello Hello Hello
                Hello Hello Hello Hello Hello Hello Hello Hello Hello'
                Hello Hello Hello Hello Hello Hello Hello Hello Hello`, likesCount: 0
            },
            {
                id: 6, message: `'Hello Hello Hello Hello Hello Hello Hello Hello Hello
                Hello Hello Hello Hello Hello Hello Hello Hello Hello'
                Hello Hello Hello Hello Hello Hello Hello Hello Hello`, likesCount: 0
            },
            {
                id: 7, message: `'Hello Hello Hello Hello Hello Hello Hello Hello Hello
                Hello Hello Hello Hello Hello Hello Hello Hello Hello'
                Hello Hello Hello Hello Hello Hello Hello Hello Hello`, likesCount: 0
            },
            {
                id: 8, message: `'Hello Hello Hello Hello Hello Hello Hello Hello Hello
                Hello Hello Hello Hello Hello Hello Hello Hello Hello'
                Hello Hello Hello Hello Hello Hello Hello Hello Hello`, likesCount: 0
            },
            {
                id: 9, message: `'Hello Hello Hello Hello Hello Hello Hello Hello Hello
                Hello Hello Hello Hello Hello Hello Hello Hello Hello'
                Hello Hello Hello Hello Hello Hello Hello Hello Hello`, likesCount: 0
            },
            {
                id: 10, message: `'Hello Hello Hello Hello Hello Hello Hello Hello Hello
                Hello Hello Hello Hello Hello Hello Hello Hello Hello'
                Hello Hello Hello Hello Hello Hello Hello Hello Hello`, likesCount: 0
            },
            {
                id: 11, message: `'Hello Hello Hello Hello Hello Hello Hello Hello Hello
                Hello Hello Hello Hello Hello Hello Hello Hello Hello'
                Hello Hello Hello Hello Hello Hello Hello Hello Hello`, likesCount: 0
            },
            {
                id: 12, message: `'Hello Hello Hello Hello Hello Hello Hello Hello Hello
                Hello Hello Hello Hello Hello Hello Hello Hello Hello'
                Hello Hello Hello Hello Hello Hello Hello Hello Hello`, likesCount: 0
            },
            {
                id: 13, message: `'Hello Hello Hello Hello Hello Hello Hello Hello Hello
                Hello Hello Hello Hello Hello Hello Hello Hello Hello'
                Hello Hello Hello Hello Hello Hello Hello Hello Hello`, likesCount: 0
            },
            {
                id: 14, message: `'Hello Hello Hello Hello Hello Hello Hello Hello Hello
                Hello Hello Hello Hello Hello Hello Hello Hello Hello'
                Hello Hello Hello Hello Hello Hello Hello Hello Hello`, likesCount: 0
            },
        ],
    },
    info: {
        data: {
            userId: undefined,
            lookingForAJob: undefined,
            fullname: undefined,
            contacts: {},
            photos: {
                small: undefined,
                large: undefined
            }
        },
        status: undefined
    },
    userId: undefined
}

//for changing state in store
export const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            return addPost(state, action.post)

        case DELETE_POST:
            return deletePost(state, action.postId)

        case SET_USER_DATA:
            return setUserData(state, action.data)

        case SET_USER_ID:
            return setUserId(state, action.userId)

        case SET_PROFILE_STATUS:
            return { ...state, info: { ...state.info, status: action.status } }

        default:
            return state
    }
}


/*---------------------------------------------------------------------------------*/

const addPost = (state, post) => {
    const posts = state.posts.posts
    const newPost = {
        id: posts[posts.length - 1].id + 1,
        message: post,
        likesCount: 0
    }

    return {
        ...state, posts: { posts: [...posts, newPost] }
    }
}

const deletePost = (state, postId) => {
    return {
        ...state, posts: { posts: state.posts.posts.filter((post) => post.id !== postId) }
    }
}

const setUserData = (state, data) => ({ ...state, info: { ...state.info, data } })

const setUserId = (state, userId) => ({ ...state, userId })
