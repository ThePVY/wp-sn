import { UserPhotosDT } from '@/types/api-types'
import { IWrapperF } from '@/types/common-types'
import Div from '@/components/common/Div'
import PostForm from './PostForm'
import Post from './Post/Post'

interface IPostsProps {
  userName: string
  photos: UserPhotosDT
  iam: boolean
  spinLogoOn: IWrapperF
  addPost: 
}

const Posts = ({
  userName = '...',
  photos,
  iam = false,
  spinLogoOn,
  addPost,
  deletePost,
  resetForm,
  posts: { posts },
}) => {
  const handleSubmit = ({ post }) => {
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
