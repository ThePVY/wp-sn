import s from './Content.module.css'
import { Route, Switch } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';
import { connect } from 'react-redux';
import { initializeApp } from '../../redux/app-reducer'
import Preloader from '../common/Preloader';
import selector from '../../redux/selectors';

const Profile = lazy(() => import('./Profile/Profile'))
const Dialogs = lazy(() => import('./Dialogs/Dialogs'))
const Users = lazy(() => import('./Users/Users'))
const Login = lazy(() => import('./Login/Login'))
const News = lazy(() => import('./News/News'))
const Images = lazy(() => import('./Images/Images'))


const Content = ({ initialized = false, initializeApp }) => {
    useEffect(() => {
        initializeApp()
    }, [initializeApp])

    return (
        <div className={s.content}>
            {
                initialized ?
                    <Suspense fallback={<PageLoading />}>
                        <Switch>
                            <Route exact path='/' render={() => <Profile />} />
                            <Route path='/profile/:userId?' render={() => <Profile />} />
                            <Route path='/dialogs' render={() => <Dialogs />} />
                            <Route path='/users' render={() => <Users />} />
                            <Route path='/login' render={() => <Login />} />
                            <Route path='/news' render={() => <News />} />
                            <Route path='/images' render={() => <Images />} />
                        </Switch>
                    </Suspense>
                    :
                    <PageLoading />

            }
        </div>
    );
}

const mapStateToProps = (state) => ({
    initialized: selector.app.getInitialized(state)
})

export default connect(mapStateToProps, { initializeApp })(Content);


const PageLoading = props => (
    <div className={s.preloaderContainer}>
        <Preloader isFetching={true} />
    </div>
)

