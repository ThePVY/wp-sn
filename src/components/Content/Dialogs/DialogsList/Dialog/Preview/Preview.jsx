import styles from './Preview.module.css'

const Preview = (props) => {
    return (
        <div className={styles.preview}>
            <span>{props.state.preview}</span>
        </div>
    );
};

export default Preview;