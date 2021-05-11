import styles from './Dialog.module.css'
import Ava from './Ava/Ava';
import Name from './Name/Name';
import Preview from './Preview/Preview';


const Dialog = (props) => {

    return (
        <div className={styles.dialog}>
            <Ava {...props} />
            <Name {...props} />
            <Preview message={ props.dialog.messages[0].message } />
        </div>
    );
};

export default Dialog;