import Button from '@/components/common/Button'
import { createField, TextareaTemplate } from '@/components/common/CustomFields/CustomFields'
import Div from '@/components/common/Div'
import { useValidation } from '@/hooks/useValidation'
import { noErrorRequired, validate500 } from '@/scripts/validates'
import { FC } from 'react'
import { InjectedFormProps, reduxForm } from 'redux-form'

interface IPostFormData {
  post: string
}

interface IPostFormProps {
  onSubmit: (jsonObj: { post: string }) => void
}

type InjectedProps = InjectedFormProps<IPostFormData, IPostFormProps>

const PurePostForm: FC<InjectedProps> = props => {
  const [postVO] = useValidation(false)

  return (
    <form onSubmit={props.handleSubmit}>
      {createField({
        component: TextareaTemplate,
        name: 'post',
        type: 'text',
        placeholder: 'Enter your Post',
        validate: [noErrorRequired, validate500],
        isValid: postVO.setIsValid,
      })}
      <Div width='25%' margin='0'>
        <Button type='submit' disabled={!postVO.isValid}>
          Add Post
        </Button>
      </Div>
    </form>
  )
}

const PostForm = reduxForm({ form: 'post' })(PurePostForm)

export default PostForm
