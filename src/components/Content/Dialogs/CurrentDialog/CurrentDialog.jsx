import { Field, reduxForm } from 'redux-form';
import { useValidation } from '../../../../hooks/useValidation';
import { noErrorRequired, validate100 } from '../../../../scripts/validates';
import { TextareaTemplate } from '../../../common/CustomFields/CustomFields';
import styles from './CurrentDialog.module.css'
import Message from './Message/Message';

const CurrentDialog = ({ messages, spinLogoOn, addMessage, resetForm }) => {

    const sendMessage = ({ message }) => {
        spinLogoOn(() => addMessage(message))
        resetForm('message')
    }

    return (
        <div className={styles.dialog}>
            <div className={styles.messages}>
                {
                    messages.map((obj) => <Message key={obj.id} message={obj.message} my={obj.my} />)
                }
            </div>
            <MessageForm onSubmit={sendMessage} />
        </div>
    );
};

export default CurrentDialog;

/*---------------------------------------------------------------------------------*/

let MessageForm = props => {

    const [ messageVO,  ] = useValidation(false)

    return (
        <form onSubmit={props.handleSubmit} className={styles.messageForm} >
            <div>
                <Field component={TextareaTemplate} name='message' type='text' placeholder='Enter your message'
                    validate={[noErrorRequired, validate100]} isValid={messageVO.setIsValid} />
            </div>
            <div className={styles.buttonContainer}>
                <button type='submit' disabled={!messageVO.isValid} >Send Message</button>
            </div>
        </form>
    )
}

MessageForm = reduxForm({ form: 'message' })(MessageForm)
