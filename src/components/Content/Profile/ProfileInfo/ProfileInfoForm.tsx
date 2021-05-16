import Button from '@/components/common/Button'
import {
  createField,
  InputTemplate,
  TextareaTemplate
} from '@/components/common/CustomFields/CustomFields'
import { ProfileInfoFormDT } from '@/types/form-types'
import { FC, useEffect, useState } from 'react'
import { InjectedFormProps, reduxForm } from 'redux-form'
import styled from 'styled-components'

const Form = styled.form`
  box-sizing: border-box;
  width: 70%;
  height: 100%;
  overflow-y: scroll;
  margin: 0px auto;
  div {
    text-align: left;
    padding: 0.4em 0;
  }
`

interface IFormProps {
  onSubmit: (jsonObj: ProfileInfoFormDT) => void
}

type InjectedProps = InjectedFormProps<IFormProps, ProfileInfoFormDT>

const PureProfileInfoForm: FC<InjectedProps> = (props) => {
  const [lfjIsChecked, setLFJIsChecked] = useState(false)
  const checkObserver = (setStateFn: typeof setLFJIsChecked) => {
    return (checked: boolean) => setStateFn(checked)
  }

  useEffect(() => {
    
  })

  return (
    <Form onSubmit={props.handleSubmit}>
      {createField({
        component: InputTemplate,
        name: 'fullName',
        type: 'text',
        placeholder: 'Enter your fullname'
      })}
      {createField({
        component: TextareaTemplate,
        name: 'aboutMe',
        type: 'text',
        placeholder: 'Some information about you'
      })}
      {createField({
        component: InputTemplate,
        name: 'lookingForAJob',
        type: 'checkbox',
        placeholder: 'Looking for a Job',
        isChecked: checkObserver(setLFJIsChecked)
      })}
      {createField({
        component: TextareaTemplate,
        name: 'lookingForAJobDescription',
        type: 'text',
        placeholder: 'Your professional skills',
        disabled: !lfjIsChecked
      })}
      {createField({
        component: InputTemplate,
        name: 'contacts.github',
        type: 'text',
        placeholder: 'github'
      })}
      {createField({
        component: InputTemplate,
        name: 'contacts.vk',
        type: 'text',
        placeholder: 'vk'
      })}
      {createField({
        component: InputTemplate,
        name: 'contacts.facebook',
        type: 'text',
        placeholder: 'facebook'
      })}
      {createField({
        component: InputTemplate,
        name: 'contacts.instagram',
        type: 'text',
        placeholder: 'instagram'
      })}
      {createField({
        component: InputTemplate,
        name: 'contacts.twitter',
        type: 'text',
        placeholder: 'twitter'
      })}
      {createField({
        component: InputTemplate,
        name: 'contacts.website',
        type: 'text',
        placeholder: 'website'
      })}
      {createField({
        component: InputTemplate,
        name: 'contacts.youtube',
        type: 'text',
        placeholder: 'youtube'
      })}
      {createField({
        component: InputTemplate,
        name: 'contacts.mainLink',
        type: 'text',
        placeholder: 'mainLink'
      })}
      <div>
        <Button type="submit">Update profile information</Button>
      </div>
    </Form>
  )
}

const ProfileInfoForm = reduxForm({ form: 'add-profile-info' })(PureProfileInfoForm)

export default ProfileInfoForm
