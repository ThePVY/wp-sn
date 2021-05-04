import preloader from '../../images/preloader.gif'

const Preloader = props => {

    return (
        <span>
            {
                props.isFetching ? <img src={preloader} alt='' /> : ''
            }
        </span>
    )
}

export default Preloader