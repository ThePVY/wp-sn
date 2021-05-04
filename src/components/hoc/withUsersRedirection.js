import { connect } from "react-redux"
import { Redirect, withRouter } from "react-router"
import { compose } from "redux"


const withUsersRedirection = Component => {

    const withRedirection = ({ isAuthorized, userId, match: { params }, ...other }) => {

        return (
            isAuthorized || params.userId ? 
                <Component {...other} />
                :
                <Redirect to='/users' />
        )
    }

    const mapStateToProps = state => ({
        isAuthorized: state.auth.isAuthorized,
    })

    return compose(
        connect(mapStateToProps, null),
        withRouter,
    )(withRedirection)
}

export default withUsersRedirection