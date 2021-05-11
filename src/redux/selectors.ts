import { RootStateT } from "./store-redux"

const selector = {
    app: {
        getInitialized: (state: RootStateT) => state.app.initialized,
        getSpinLogo: (state: RootStateT) => state.app.spinLogo
    },
    auth: {
        getAuthId: (state: RootStateT) => state.auth.data.id,
        getLogin: (state: RootStateT) => state.auth.data.login,
        getIsAuthorized: (state: RootStateT) => state.auth.isAuthorized
    },
    dialogs: {
        getDialogs: (state: RootStateT) => state.dialogs,
        getDialogsList: (state: RootStateT) => state.dialogs.dialogsList
    },
    profile: {
        getData: (state: RootStateT) => state.profile.info.data,
        getUserName: (state: RootStateT) => state.profile.info.data.fullName,
        getStatus: (state: RootStateT) => state.profile.info.status,
        getPhotos: (state: RootStateT) => state.profile.info.data.photos,
        getPosts: (state: RootStateT) => state.profile.posts,
        getUserId: (state: RootStateT) => state.profile.userId
    },
    users: {
        getUsersList: (state: RootStateT) => state.users.usersList,
        getPagesCount: (state: RootStateT) => state.users.pagesTotalCount,
        getSelectedPage: (state: RootStateT) => state.users.selectedPage,
        getIsFetching: (state: RootStateT) => state.users.isFetching,
        getLoadings: (state: RootStateT) => state.users.loadings
    }
}

export default selector
