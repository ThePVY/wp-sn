import s from './ProfileInfo.module.css'
import Ava from './Ava/Ava'
import ProfileStatus from './ProfileStatus/ProfileStatus';
import { useEffect } from 'react';
import makeSlideContent, { removeScrollListener } from '../../../../scripts/makeSlideContent';
import { reduxForm } from 'redux-form';
import { createField, Input, TextareaTemplate } from '../../../common/CustomFields/CustomFields';
import { useState } from 'react';
import ViewPanel from '../../../common/ViewPanel/ViewPanel';
import ProfileData from './ProfileData/ProfileData';
import { Button } from '../../../common/Button';
import Div from '../../../common/Div';
import styled from 'styled-components';

const StyledInfo = styled(Div)`
    border: 1px solid grey;
    border-radius: 20px;
    width: 90%;
    min-width: 250px;
    height: fit-content;
    margin: 1em auto;
    padding: 1em;
    text-align: center;
`

const ProfileInfo = ({ data, status, authId, userId, publishStatus, uploadProfilePhoto, putProfileInfo }) => {

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

    const setEdit = () => setShowEdit(true)

    const resetEdit = () => setShowEdit(false)

    const uploadPhoto = ({ photo }) => uploadProfilePhoto(photo, authId)

    const closePanel = () => setEditMode(false)

    const showPanel = () => setEditMode(true)

    return (
        <Div id='slide-container'>
            <Div id='slide-content' zIndex='1' padding='10px 0px' height='fit-content'>
                <Ava photos={data.photos} uploadPhoto={uploadPhoto} />
                <StyledInfo onMouseOver={setEdit} onMouseOut={resetEdit}>
                    <ProfileStatus {...psProps} />
                    <div onClick={showPanel} className={s.editProfile}>edit profile</div>
                    {
                        editMode ?
                            <ViewPanel isShown={editMode} content={<AddProfileInfoForm onSubmit={putProfileInfo} />}
                                fixed={true} onClose={closePanel} />
                            :
                            <>
                                <ProfileData data={data} />
                            </>
                    }
                </StyledInfo>

                <StyledInfo>
                    <div>Images</div>
                    <div>Music</div>
                    <div>Video</div>

                    <div className={s.takePlace}>FOR TAKE PLACE</div>
                    <div className={s.takePlace}>FOR TAKE PLACE</div>
                    <div className={s.takePlace}>FOR TAKE PLACE</div>
                    <div className={s.takePlace}>FOR TAKE PLACE</div>
                    <div className={s.takePlace}>FOR TAKE PLACE</div>
                    <div className={s.takePlace}>FOR TAKE PLACE</div>
                </StyledInfo>

            </Div>
        </Div>
    );
};

export default ProfileInfo;

let AddProfileInfoForm = ({ handleSubmit }) => {

    const [lfjIsChecked, setLFJIsChecked] = useState(false)
    const checkObserver = (setStateFn) => (state) => setStateFn(state)

    const formStyle = `${s.infoForm}`
    return (
        <form onSubmit={handleSubmit} className={formStyle}>
            {createField(Input, 'fullName', 'text', 'Enter your fullname')}
            {createField(Input, 'lookingForAJob', 'checkbox', undefined, undefined, undefined,
                         'Looking for a Job', checkObserver(setLFJIsChecked))}
            {createField(TextareaTemplate, 'lookingForAJobDescription', 'text', 'Your professional skills', 
                        undefined, undefined, undefined, undefined, !lfjIsChecked)}
            {createField(TextareaTemplate, 'aboutMe', 'text', 'Some information about you')}
            {createField(Input, 'contacts.github', 'text', 'github')}
            {createField(Input, 'contacts.vk', 'text', 'vk')}
            {createField(Input, 'contacts.facebook', 'text', 'facebook')}
            {createField(Input, 'contacts.instagram', 'text', 'instagram')}
            {createField(Input, 'contacts.twitter', 'text', 'twitter')}
            {createField(Input, 'contacts.website', 'text', 'website')}
            {createField(Input, 'contacts.youtube', 'text', 'youtube')}
            {createField(Input, 'contacts.mainLink', 'text', 'mainLink')}
            <div>
                <Button type='submit'>Update profile information</Button>
            </div>
        </form>
    )
}

AddProfileInfoForm = reduxForm({ form: 'add-profile-info' })(AddProfileInfoForm)
