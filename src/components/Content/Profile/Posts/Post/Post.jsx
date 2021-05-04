import s from './Post.module.css'
import defaultImage from '../../../../../images/user-image.png'
import Hover from '../../../../common/Hover/Hover'


const Post = ({ iam, photos = {}, deletePost, ...props }) => {

    const avaSrc = photos.small ? photos.small : defaultImage

    return (
        <>
            <div className={s.post}>
                <div className={s.centered}>
                    <img src={avaSrc} alt="q" />
                    <div>
                        <span className={s.like}>Like</span> {props.state.likesCount}
                    </div>
                </div>
                <div className={s.messageContainer}>
                    <span className={`${s.message} ${s.centered}`}>
                        {props.state.message}
                    </span>
                </div>
            </div>
            <div>
                {
                    iam &&
                    <Hover style={s.delete} onClick={deletePost}
                        base={'Hover over me'}
                        hovered={'Delete Post'}
                    />
                }
            </div>
        </>
    );
};

export default Post;