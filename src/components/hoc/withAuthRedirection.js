import { connect } from 'react-redux'
import { Redirect } from 'react-router'


export const WithAuthRedirection = Component => {

    const mapStateToProps = (state) => ({
        isAuthorized: state.auth.isAuthorized
    })

    const withRedirection = ({isAuthorized, ...props}) => {
        return isAuthorized ? 
            <Component {...props} isAuthorized={isAuthorized} />
            :
            <Redirect to='/login' />   
    }

    return connect(mapStateToProps, {})(withRedirection)
}