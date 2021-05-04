import { validateURL } from '../../../../../scripts/scripts';
import Preloader from '../../../../common/Preloader';
import s from './ProfileData.module.css'


const ProfileData = ({ data: { aboutMe, fullName, contacts } }) => {

    return (
        <>
            <AboutMe aboutMe={aboutMe} fullName={fullName} />
            <Contacts contacts={contacts} />
        </>
    )
}

export default ProfileData

const Contacts = ({ contacts }) => {
    if( !contacts ) {
        return <Preloader isFetching={true} />
    }
    return (
        <div className={s.contacts}>
            <div>
                <span className={s.header}>Contacts</span> 
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

const AboutMe = ({ aboutMe, fullName }) => {
    return (
        <div className={s.aboutMe}>
            <div>
                <span className={s.header}>Name</span>
            </div>

            <div className={s.name}>
                <span>{fullName}</span>
            </div>
            
            <div>
                <span className={s.header}>About Me</span>
            </div>
            {
                aboutMe
            }
        </div>
    );
};
