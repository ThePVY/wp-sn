import styles from './Dialog.module.css'
import Ava from './Ava/Ava';
import Name from './Name/Name';
import Preview from './Preview/Preview';


const Dialog = (props) => {

    return (
        <div className={styles.dialog}>
            <Ava state={ props.state } />
            <Name state={ props.state } />
            <Preview state={ props.state.preview } />
        </div>
    );
};

export default Dialog;