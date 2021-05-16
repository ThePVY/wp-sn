import { AppStateT } from './app-reducer'
import { AuthStateT } from './auth-reducer'
import { DialogsStateT } from './dialogs-reducer'
import { ProfileStateT } from './profile-reducer'
import { RootStateT } from './store-redux'
import { UsersStateT } from './users-reducer'

type AppState = AppStateT
type AuthState = AuthStateT
type DialogsState = DialogsStateT
type ProfileState = ProfileStateT
type UsersState = UsersStateT

export type AppInitialized = AppState['initialized']
export type AppSpinLogo = AppState['spinLogo']

export type AuthId = AuthState['data']['id']
export type AuthLogin = AuthState['data']['login']
export type AuthIsAuthorized = AuthState['isAuthorized']

export type DialogList = DialogsState['dialogsList']

export type ProfileData = ProfileState['info']['data']
export type ProfileFullName = ProfileState['info']['data']['fullName']
export type ProfileStatus = ProfileState['info']['status']
export type ProfilePhotos = ProfileState['info']['data']['photos']
export type ProfilePosts = ProfileState['posts']
export type ProfileUserId = ProfileState['info']['data']['userId']

export type UsersList = UsersState['usersList']
export type PagesTotalCount = UsersState['pagesTotalCount']
export type SelectedPage = UsersState['selectedPage']
export type UsersIsFetching = UsersState['isFetching']
export type UsersLoadings = UsersState['loadings']


const selector = {
  app: {
    getInitialized: (state: RootStateT): AppInitialized => state.app.initialized,
    getSpinLogo: (state: RootStateT): AppSpinLogo => state.app.spinLogo,
  },
  auth: {
    getAuthId: (state: RootStateT): AuthId => state.auth.data.id,
    getLogin: (state: RootStateT): AuthLogin => state.auth.data.login,
    getIsAuthorized: (state: RootStateT): AuthIsAuthorized => state.auth.isAuthorized,
  },
  dialogs: {
    getDialogs: (state: RootStateT): DialogsState => state.dialogs,
    getDialogsList: (state: RootStateT): DialogList => state.dialogs.dialogsList,
  },
  profile: {
    getData: (state: RootStateT): ProfileData => state.profile.info.data,
    getUserName: (state: RootStateT): ProfileFullName => state.profile.info.data?.fullName,
    getStatus: (state: RootStateT): ProfileStatus => state.profile.info.status,
    getPhotos: (state: RootStateT): ProfilePhotos => state.profile.info.data?.photos,
    getPosts: (state: RootStateT): ProfilePosts => state.profile.posts,
    getUserId: (state: RootStateT): ProfileUserId => state.profile.info.data?.userId,
  },
  users: {
    getUsersList: (state: RootStateT): UsersList => state.users.usersList,
    getPagesCount: (state: RootStateT): PagesTotalCount => state.users.pagesTotalCount,
    getSelectedPage: (state: RootStateT): SelectedPage => state.users.selectedPage,
    getIsFetching: (state: RootStateT): UsersIsFetching => state.users.isFetching,
    getLoadings: (state: RootStateT): UsersLoadings => state.users.loadings,
  },
}

export default selector
