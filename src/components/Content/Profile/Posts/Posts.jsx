import Post from "./Post/Post";
import { reduxForm } from "redux-form";
import { noErrorRequired, validate500 } from "../../../../scripts/validates";
import {
  createField,
  TextareaTemplate,
} from "../../../common/CustomFields/CustomFields";
import { useValidation } from "../../../../hooks/useValidation";
import { Button } from "../../../common/Button";
import Div from "../../../common/Div";

const Posts = ({
  userName = "...",
  photos,
  iam = false,
  spinLogoOn,
  addPost,
  deletePost,
  resetForm,
  posts: { posts },
}) => {
  const handleSubmit = ({ post }) => {
    spinLogoOn(() => addPost(post));
    resetForm("post");
  };

  return (
    <Div padding='0.5em 0px'>
      <Div height='fit-content' width='90%' margin="0 auto">
        {
          iam ?
            <PostForm onSubmit={handleSubmit} />
            :
            <span>Posts of {userName} </span>
        }
      </Div>
      <Div height='fit-content' width='80%' margin='1em auto'>
        {
          posts.map((obj) => {
            const handleDelete = () => deletePost(obj.id)
            return <Post key={obj.id} iam={iam} state={obj} photos={photos} deletePost={handleDelete} />
          })
            .reverse()
        }
      </Div>
    </Div>
  );
};

export default Posts;

/*-----------------------------------------------------------------------------------*/

let PostForm = (props) => {
  const [postVO] = useValidation(false);

  return (
    <form onSubmit={props.handleSubmit}>
      {createField(TextareaTemplate,"post","text","Enter your Post",[noErrorRequired, validate500],postVO.setIsValid)}
      <Div width="25%" margin="0">
        <Button type="submit" disabled={!postVO.isValid}>Add Post</Button>
      </Div>
    </form>
  );
};

PostForm = reduxForm({ form: "post" })(PostForm);
