import styles from './Message.module.css'

const Message = (props) => {
    const messageClass = (props.my)? `${styles.message} ${styles.my}` : styles.message;
    return (
        <div className={messageClass}>
            { props.message }
        </div>
    );
};

export default Message;