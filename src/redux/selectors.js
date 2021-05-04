
const selector = {
    app: {
        getInitialized: state => state.app.initialized,
        getSpinLogo: state => state.app.spinLogo
    },
    auth: {
        getAuthId: state => state.auth.data.id,
        getLogin: state => state.auth.data.login,
        getIsAuthorized: state => state.auth.isAuthorized
    },
    dialogs: {
        getDialogs: state => state.dialogs,
        getMessages: state => state.dialogs.messages,
        getDialogsList: state => state.dialogs.dialogsList
    },
    profile: {
        getData: state => state.profile.info.data,
        getUserName: state => state.profile.info.data.fullName,
        getStatus: state => state.profile.info.status,
        getPhotos: state => state.profile.info.data.photos,
        getPosts: state => state.profile.posts,
        getUserId: state => state.profile.userId
    },
    users: {
        getUsersList: state => state.users.usersList,
        getPagesCount: state => state.users.pagesTotalCount,
        getSelectedPage: state => state.users.selectedPage,
        getIsFetching: state => state.users.isFetching,
        getLoadings: state => state.users.loadings
    }
}

export default selector
