import { connect } from 'react-redux';
import selector from '../../../redux/selectors';
import { actionCreator, thunkCreator } from '../../../redux/profile-reducer';
import ProfileInfo from './ProfileInfo/ProfileInfo'
import Posts from './Posts/Posts'
import { useEffect } from 'react';
import { compose } from 'redux';
import { withRouter } from 'react-router';
import SplitContent from '../../common/SplitContent/SplitContent';
import { resetForm, spinLogoOn } from '../../../redux/app-reducer';


const Profile = (props) => {

    const { authId, getProfileData, getProfileStatus } = props
    const { userId = authId } = props.match.params

    useEffect(() => {
        getProfileStatus(userId)
        getProfileData(userId)
        console.log('Profile loaded Status and Data')
    }, [authId, userId, getProfileData, getProfileStatus])

    const publishStatus = status => {
        const { putProfileStatus, resetForm } = props
        putProfileStatus({ status })
        resetForm('status')
    }

    return (
        <SplitContent colorLeft={true} colorRight={true}
            left={
                <ProfileInfo {...props} publishStatus={publishStatus} />
            }
            right={
                <Posts {...props} iam={ !!authId && userId === authId } />
            } />
    );
};


const mapStateToProps = (state) => {
    return {
        photos: selector.profile.getPhotos(state),
        userName: selector.profile.getUserName(state),
        posts: selector.profile.getPosts(state),
        authId: selector.auth.getAuthId(state),
        userId: selector.profile.getUserId(state),

        data: selector.profile.getData(state),
        status: selector.profile.getStatus(state),
    }
}

export default compose(
    connect(mapStateToProps, { ...thunkCreator, ...actionCreator.posts, resetForm, spinLogoOn }),
    withRouter
)(Profile);
