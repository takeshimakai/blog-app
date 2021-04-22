import { useContext } from 'react';
import { useParams, Link, Switch, Route } from 'react-router-dom';

import PostForm from '../PostForm';
import Comments from '../comment/Comments';

import UserContext from '../../context/UserContext';

const Post = (props) => {
  const { posts, isLoading } = props;
  const { currentUser } = useContext(UserContext);
  const { postId } = useParams();

  const post = posts.find(post => post._id === postId);

  return (
    <Switch>
      <Route path='/:postId/edit-post'>
        <PostForm post={post} />
      </Route>
      <Route path='/:postId'>
        {!isLoading
          ? <div className='post-container'>
              <h3 dangerouslySetInnerHTML={{__html: post.title}} />
              <p dangerouslySetInnerHTML={{__html: post.content}} />
              <p>{post.datePublished}</p>
              {currentUser && currentUser.isAdmin && <Link to={`/${postId}/edit-post`}>Edit</Link>}
              <Comments postId={postId} />
            </div>
          : <p>Loading...</p>
        }
      </Route>
    </Switch>
  )
}

export default Post;