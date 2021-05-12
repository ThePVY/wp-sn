import { IValidate } from '@/types/common-types'
import { IInputRF, IMetaRF } from '@/types/form-types'
import { FC, ReactElement, useEffect } from 'react'
import { Field } from 'redux-form'
import styled from 'styled-components'
import Div from '../Div'
import StyledInput, { InputType } from '../Input'
import Textarea from '../Textarea'

const StyledSpan = styled.span`
  padding: 0px 1rem;
`

interface ICreateFieldInput {
  component: FC
  name: string
  type: string
  placeholder?: string
  validate?: IValidate[]
  isValid?: (valid: boolean) => void
  isChecked?: (checked: boolean) => void
  disabled?: boolean
  text?: string
}

export const createField = ({ text = '', ...other }: ICreateFieldInput): ReactElement => {
  return (
    <Div height='fit-content'>
      <Field {...other} />
      {text && <StyledSpan>{text}</StyledSpan>}
    </Div>
  )
}

const ErrorSpan = styled.span<{ error?: boolean }>`
  color: ${props => (props.error ? 'rgb(95, 29, 29)' : 'inherit')};
`

interface IFieldTemplateProps extends ITemplateProps {
  notified: boolean
}

export const FieldTemplate: FC<IFieldTemplateProps> = ({
  input,
  meta,
  notified,
  children,
  isValid,
  isChecked,
}) => {
  let notification = ''
  if (meta.touched && notified) {
    notification = meta.error || ''
  }

  const { valid } = meta
  useEffect(() => isValid(valid), [valid, isValid])
  const { checked } = input
  useEffect(() => isChecked(checked), [checked, isChecked])

  return (
    <>
      {children}
      <ErrorSpan error>{notification}</ErrorSpan>
    </>
  )
}

interface ITemplateProps {
  input: IInputRF
  meta: IMetaRF
  type?: string
  placeholder?: string
  notified?: boolean
  disabled?: boolean
  isValid?: (valid: boolean) => void
  isChecked?: (checked: boolean) => void
}

export const TextareaTemplate: FC<ITemplateProps> = ({ type, placeholder, notified, ...props }) => {
  return (
    <FieldTemplate {...props} notified={notified}>
      <Textarea {...props.input} placeholder={placeholder} type={type} disabled={props.disabled} />
    </FieldTemplate>
  )
}

interface IInputProps {
  input: IInputRF
  meta: IMetaRF
  type?: keyof typeof InputType
  placeholder?: string
  notified?: boolean
  disabled?: boolean
  isValid?: (valid: boolean) => void
  isChecked?: (checked: boolean) => void
}

export const Input: FC<IInputProps> = ({ type, placeholder, notified, ...props }) => {
  return (
    <FieldTemplate {...props} notified={notified}>
      <StyledInput {...props.input} placeholder={placeholder} type={type} />
    </FieldTemplate>
  )
}
