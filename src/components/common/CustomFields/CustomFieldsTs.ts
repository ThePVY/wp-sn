import { IValidate } from '@/types/common-types';
import { IInputRF, IMetaRF } from '@/types/form-types';
import { FC } from 'react'
import { InputType } from '../Input';


export interface ICreateFieldInput {
  component: FC
  name: string
  validate?: IValidate[]
  text?: string
  type: string
  placeholder?: string
  disabled?: boolean
  isValid?: (valid: boolean) => void
  isChecked?: (checked: boolean) => void
}

export interface IFieldTemplateProps extends ITemplateProps {
  notified?: boolean
}

export interface ITextareaProps extends ITemplateProps {
  type?: string
  placeholder?: string
  disabled?: boolean
}

export interface IInputProps extends ITemplateProps {
  type?: keyof typeof InputType
  placeholder?: string
  disabled?: boolean
}

export interface ITemplateProps extends ITemplateObservers {
  input: IInputRF
  meta: IMetaRF
}

interface ITemplateObservers {
  isValid?: (valid: boolean) => void
  isChecked?: (checked: boolean) => void
}

