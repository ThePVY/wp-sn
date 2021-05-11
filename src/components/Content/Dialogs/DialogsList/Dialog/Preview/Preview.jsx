import styles from './Preview.module.css'

const Preview = ({ message }) => {

    const preview = message.length < 30 ? message : message.slice(0, 30)

    return (
        <div className={styles.preview}>
            <span>{preview}</span>
        </div>
    );
};

export default Preview;