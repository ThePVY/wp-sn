import { Button } from '@/components/common/Button'
import Div from '@/components/common/Div'
import FlexContainer from '@/components/common/FlexContainer'
import { Field, reduxForm } from 'redux-form'
import styled from 'styled-components'
import { useValidation } from '../../../../hooks/useValidation'
import { noErrorRequired, validate100 } from '../../../../scripts/validates'
import { TextareaTemplate } from '../../../common/CustomFields/CustomFields'
import Message from './Message/Message'

const DialogWrapper = styled(FlexContainer)`
  padding: 0px 6em;
  text-align: left;
  color: rgb(186, 194, 194);
  height: 86vh;
`

const MessagesWrapper = styled(FlexContainer)`
  margin-bottom: 2em;
  height: inherit;
  overflow-y: scroll;
  scrollbar-width: none;
`

const CurrentDialog = ({ dialog, spinLogoOn, addMessage, resetForm }) => {
  const sendMessage = ({ message }) => {
    spinLogoOn(() => addMessage(dialog.id, message))
    resetForm('message')
  }

  return (
    <DialogWrapper dir='column'>
      <MessagesWrapper dir='column-reverse' >
        {dialog.messages.map(obj => (
          <Message key={obj.id} message={obj.message} my={obj.my} />
        ))}
      </MessagesWrapper>
      <MessageForm onSubmit={sendMessage} />
    </DialogWrapper>
  )
}

export default CurrentDialog

/*---------------------------------------------------------------------------------*/

let MessageForm = props => {
  const [messageVO] = useValidation(false)

  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field
          component={TextareaTemplate}
          name='message'
          type='text'
          placeholder='Enter your message'
          validate={[noErrorRequired, validate100]}
          isValid={messageVO.setIsValid}
        />
      </div>
      <Div width='30%'>
        <Button type='submit' disabled={!messageVO.isValid}>
          Send Message
        </Button>
      </Div>
    </form>
  )
}

MessageForm = reduxForm({ form: 'message' })(MessageForm)
