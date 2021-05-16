import { FC, useEffect } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { RouteComponentProps, withRouter } from 'react-router'
import { resetForm, spinLogoOn } from '@/redux/app-reducer'
import selector, {
  AuthId,
  ProfileData,
  ProfileFullName,
  ProfilePhotos,
  ProfilePosts,
  ProfileStatus,
  ProfileUserId
} from '@/redux/selectors'
import { StatusFormDT } from '@/types/form-types'
import { RootStateT } from '@/redux/store-redux'
import { actionCreator as profileAC, thunkCreator as profileTC } from '@/redux/profile-reducer'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import Posts from './Posts/Posts'
import SplitContent from '../../common/SplitContent/SplitContent'

interface IStateProps {
  photos: ProfilePhotos
  userName: ProfileFullName
  posts: ProfilePosts
  authId: AuthId
  userId: ProfileUserId
  data: ProfileData
  status: ProfileStatus
}

type DispatchPropsT = typeof profileTC &
  typeof profileAC.posts & { resetForm: typeof resetForm } & { spinLogoOn: typeof spinLogoOn }

export type ProfilePropsT = IStateProps & DispatchPropsT & RouteComponentProps<IProfileRouteParams>

interface IProfileRouteParams {
  userId: string
}

const Profile: FC<ProfilePropsT> = (props) => {
  const { authId, getProfileData, getProfileStatus } = props
  const { userId = authId } = props.match.params
  const id = Number(userId)

  useEffect(() => {
    getProfileStatus(id)
    getProfileData(id)
  }, [authId, id, getProfileData, getProfileStatus])

  const publishStatus = (status: StatusFormDT) => {
    const { putProfileStatus, resetForm } = props
    putProfileStatus(status)
    resetForm('status')
  }

  return (
    <SplitContent
      colorLeft
      colorRight
      left={<ProfileInfo {...props} publishStatus={publishStatus} />}
      right={<Posts {...props} iam={!!authId && id === authId} />}
    />
  )
}

const mapStateToProps = (state: RootStateT) => ({
  photos: selector.profile.getPhotos(state),
  userName: selector.profile.getUserName(state),
  posts: selector.profile.getPosts(state),
  authId: selector.auth.getAuthId(state),
  userId: selector.profile.getUserId(state),
  data: selector.profile.getData(state),
  status: selector.profile.getStatus(state)
})

const dispatchToProps: DispatchPropsT = {
  ...profileTC,
  ...profileAC.posts,
  resetForm,
  spinLogoOn
}

export default compose(connect(mapStateToProps, dispatchToProps), withRouter)(Profile)
