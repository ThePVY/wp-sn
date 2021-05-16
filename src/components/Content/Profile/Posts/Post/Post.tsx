import { FC } from 'react'
import Hover from '../../../../common/Hover/Hover'
import s from './Post.module.css'
import defaultImage from 'images/user-image.png'
import { ItemTypeOf } from '@/types/common-types'
import { ProfilePropsT } from '../../Profile'

export interface IPostProps {
  iam: boolean
  photos: ProfilePropsT['photos']
  deletePost: (event?: Event) => void
  post: ItemTypeOf<ProfilePropsT['posts']['posts']>
}

const Post: FC<IPostProps> = ({ iam, photos, deletePost, post: { likesCount, message } }) => {
  const avaSrc = photos?.small || defaultImage

  return (
    <>
      <div className={s.post}>
        <div className={s.centered}>
          <img src={avaSrc} alt='q' />
          <div>
            <span className={s.like}>Like</span> {likesCount}
          </div>
        </div>
        <div className={s.messageContainer}>
          <span className={`${s.message} ${s.centered}`}>{message}</span>
        </div>
      </div>
      <div>
        {iam && (
          <Hover style={s.delete} onClick={deletePost} base='Hover over me' hovered='Delete Post' />
        )}
      </div>
    </>
  )
}

export default Post
