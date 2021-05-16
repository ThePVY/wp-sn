import Ava from './Ava/Ava'
import ProfileStatus from './ProfileStatus/ProfileStatus'
import { FC, MouseEvent, useEffect, useState } from 'react'
import makeSlideContent, { removeScrollListener } from '../../../../scripts/makeSlideContent'
import ProfileData from './ProfileData/ProfileData'
import Div from '../../../common/Div'
import ViewPanel from '@/components/common/ViewPanel/ViewPanel'
import styled from 'styled-components'
import settingsUrl from '@/images/settings.png'
import ProfileInfoForm from './ProfileInfoForm'
import { ProfilePropsT } from '../Profile'
import { AvaFormDT, StatusFormDT } from '@/types/form-types'

const StyledInfo = styled(Div)`
  border: 1px solid grey;
  border-radius: 20px;
  width: 90%;
  min-width: 250px;
  height: fit-content;
  margin: 1em auto;
  padding: 1em;
  text-align: center;
  position: relative;
  .take-place {
    margin: 2em;
  }
`

const StyledSettings = styled(Div)`
  position: absolute;
  right: 1em;
  top: 1em;
  img {
    width: 20px;
  }
  cursor: pointer;
`

interface IProfileInfoProps {
  data: ProfilePropsT['data']
  status: ProfilePropsT['status']
  authId: ProfilePropsT['authId']
  userId: ProfilePropsT['userId']
  uploadProfilePhoto: ProfilePropsT['uploadProfilePhoto']
  putProfileInfo: ProfilePropsT['putProfileInfo']
  publishStatus: (status: StatusFormDT) => void
}

const ProfileInfo: FC<IProfileInfoProps> = ({
  data = {} as ProfilePropsT['data'],
  status = '',
  authId,
  userId,
  publishStatus,
  uploadProfilePhoto,
  putProfileInfo
}) => {
  const psProps = { status, publishStatus, authId, userId }

  const [editMode, setEditMode] = useState(false)
  const [showEdit, setShowEdit] = useState(false)

  useEffect(() => {
    const container = document.getElementById('slide-container')
    const content = document.getElementById('slide-content')
    const scrollListener = makeSlideContent(content, container)
    return () => {
      removeScrollListener(scrollListener)
    }
  }, [])

  const setEdit = (e: MouseEvent<HTMLDivElement>): void => {
    if ((e.target as Element).id === 'profile-info-wrapper') setShowEdit(true)
  }

  const resetEdit = (e: MouseEvent<HTMLDivElement>): void => {
    if ((e.relatedTarget as Element).id === 'slide-content') setShowEdit(false)
  }

  const uploadPhoto = ({ photo }: AvaFormDT) => uploadProfilePhoto(photo, authId)

  const closePanel = () => setEditMode(false)

  const showPanel = () => setEditMode(true)

  return (
    <Div id="slide-container">
      <Div id="slide-content" zIndex="1" padding="10px 0px" height="fit-content">
        <Ava photos={data.photos} uploadPhoto={uploadPhoto} />
        <StyledInfo id="profile-info-wrapper" onMouseEnter={setEdit} onMouseOut={resetEdit}>
          <ProfileStatus {...psProps} />
          {showEdit ? (
            <StyledSettings onClick={showPanel} width="fit-content" height="fit-content">
              <img src={settingsUrl} alt="Settings" />
            </StyledSettings>
          ) : (
            ''
          )}
          {editMode ? (
            <ViewPanel
              isShown={editMode}
              content={<ProfileInfoForm onSubmit={putProfileInfo} />}
              fixed
              onClose={closePanel}
            />
          ) : (
            <>
              <ProfileData data={data} />
            </>
          )}
        </StyledInfo>

        <StyledInfo>
          <div>Images</div>
          <div>Music</div>
          <div>Video</div>

          <div className="take-place">FOR TAKE PLACE</div>
          <div className="take-place">FOR TAKE PLACE</div>
          <div className="take-place">FOR TAKE PLACE</div>
          <div className="take-place">FOR TAKE PLACE</div>
          <div className="take-place">FOR TAKE PLACE</div>
          <div className="take-place">FOR TAKE PLACE</div>
        </StyledInfo>
      </Div>
    </Div>
  )
}

export default ProfileInfo
