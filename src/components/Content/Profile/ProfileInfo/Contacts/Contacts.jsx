import { validateURL } from '../../../../../scripts/scripts';
import Preloader from '../../../../common/Preloader';
import styles from './Contacts.module.css'

const Contacts = ({ contacts }) => {
    if( !contacts ) {
        return <Preloader isFetching={true} />
    }
    return (
        <div className={styles.contacts}>
            <div>
                <span className={styles.header}>Contacts</span> 
            </div>
            <div>
                <ul>
                    {
                        Object.keys(contacts).reduce((acc, key, i) => 
                            contacts[key] ? [acc, <li key={i}>{key} - <a href={validateURL(contacts[key])}>{contacts[key]}</a></li>] : acc
                        , [])
                    }
                </ul>
            </div>
        </div>
    );
};

export default Contacts;