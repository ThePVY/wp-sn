import Header from './Header';
import { connect } from 'react-redux';
import { actionCreator, thunkCreator } from '../../redux/auth-reducer';
import { compose } from 'redux';
import selector from '../../redux/selectors';
import { spinLogoOn } from '../../redux/app-reducer';

const HeaderContainer = (props) => {

    const handleSignOut = () => {
        props.spinLogoOn(() => props.signOut())
    }

    return <Header {...props} handleSignOut={handleSignOut} />
}

const mapStateToProps = state => ({
    isAuthorized: selector.auth.getIsAuthorized(state),
    login: selector.auth.getLogin(state),
    spinLogo: selector.app.getSpinLogo(state)
})

export default compose(
    connect(mapStateToProps, {...actionCreator, ...thunkCreator, spinLogoOn })
)(HeaderContainer)