import { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import selector from '../../../redux/selectors'
import { thunkCreator, actionCreator } from '../../../redux/users-reducer'
import SinglePane from '../../common/SinglePane/SinglePane'
import UsersList from './UsersList/UsersList'
import { resetForm } from '../../../redux/app-reducer'

const Users = ({ getUsers, selectedPage, setSelectedPage, setFollow, ...rest }) => {
    
    useEffect(() => {
        getUsers(selectedPage)
    }, [selectedPage, getUsers])

    const onPageClick = p => setSelectedPage(p)
    
    return (
        <SinglePane fixedHeight={false} absolute={false}>
            <UsersList {...rest} onPageClick={onPageClick} onFollowClick={setFollow} selectedPage={selectedPage} />
        </SinglePane>
    )
}

const mapStateToProps = (state) => {
    return {
        usersList: selector.users.getUsersList(state),
        pagesCount: selector.users.getPagesCount(state),
        selectedPage: selector.users.getSelectedPage(state),
        isFetching: selector.users.getIsFetching(state),
        loadings: selector.users.getLoadings(state)
    }
}

export default compose(
    connect(mapStateToProps, { ...thunkCreator, ...actionCreator.usersList, resetForm }),
)(Users)