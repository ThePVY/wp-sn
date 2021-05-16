import Div from '@/components/common/Div'
import PostForm from './PostForm'
import Post from './Post/Post'
import { FC } from 'react'
import { ProfilePropsT } from '../Profile'
import { PostFormDT } from '@/types/form-types'

interface IPostsProps {
  userName: ProfilePropsT['userName']
  photos: ProfilePropsT['photos']
  iam: boolean
  spinLogoOn: ProfilePropsT['spinLogoOn']
  addPost: ProfilePropsT['addPost']
  deletePost: ProfilePropsT['deletePost']
  resetForm: ProfilePropsT['resetForm']
  posts: ProfilePropsT['posts']
}

const Posts: FC<IPostsProps> = ({
  userName = '...',
  photos,
  iam = false,
  spinLogoOn,
  addPost,
  deletePost,
  resetForm,
  posts: { posts },
}) => {
  const handleSubmit = ({ post }: PostFormDT) => {
    spinLogoOn(() => addPost(post))
    resetForm('post')
  }

  return (
    <Div padding='0.5em 0px'>
      <Div height='fit-content' width='90%' margin='0 auto'>
        {iam ? <PostForm onSubmit={handleSubmit} /> : <span>Posts of {userName}</span>}
      </Div>
      <Div height='fit-content' width='80%' margin='1em auto'>
        {posts
          .map(post => {
            const handleDelete = () => deletePost(post.id)
            return (
              <Post key={post.id} iam={iam} post={post} photos={photos} deletePost={handleDelete} />
            )
          })
          .reverse()}
      </Div>
    </Div>
  )
}

export default Posts
