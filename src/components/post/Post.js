import { useParams, Link, Switch, Route } from 'react-router-dom';

import PostForm from '../PostForm';
import Comments from '../comment/Comments';

const Post = (props) => {
  const { posts, user, isLoading } = props;
  const { postId } = useParams();

  const post = posts.find(post => post._id === postId);

  return (
    <Switch>
      <Route path={`/${postId}/edit-post`}>
        <PostForm post={post} />
      </Route>
      <Route path={`/${postId}`}>
        {!isLoading
          ? <div className='post-container'>
              <h3>{post.title}</h3>
              <p>{post.content}</p>
              <p>{post.datePublished}</p>
              {user && user.isAdmin && <Link to={`/${postId}/edit-post`}>Edit</Link>}
              <Comments postId={postId} user={user} />
            </div>
          : <p>Loading...</p>
        }
      </Route>
    </Switch>
  )
}

export default Post;