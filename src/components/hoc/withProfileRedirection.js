import { connect } from "react-redux"
import { Redirect } from "react-router"


const withProfileRedirection = Component => {

    const withRedirection = ({ isAuthorized, ...other }) => {
        return (
            isAuthorized ? 
                <Redirect to='/profile' />
                :
                <Component {...other} />
        )
    }

    const mapStateToProps = state => ({
        isAuthorized: state.auth.isAuthorized
    })

    return connect(mapStateToProps, null)(withRedirection)
}

export default withProfileRedirection