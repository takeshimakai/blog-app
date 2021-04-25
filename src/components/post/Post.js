import { useContext } from 'react';
import { useParams, Link, Switch, Route } from 'react-router-dom';

import PostForm from '../PostForm';
import Comments from '../comment/Comments';
import Error from '../Error';

import UserContext from '../../context/UserContext';

const Post = (props) => {
  const { posts, isLoading } = props;
  const { currentUser } = useContext(UserContext);
  const { postId } = useParams();

  const post = posts.find(post => post._id === postId);

  return (
    <Switch>
      <Route path='/:postId/edit-post'>
        {currentUser && currentUser.isAdmin
          ? <PostForm post={post} />
          : <Error />
        }
      </Route>
      <Route path='/:postId'>
        {!isLoading
          ? <div className='post-container'>
              <h3 dangerouslySetInnerHTML={{__html: post.title}} />
              <p dangerouslySetInnerHTML={{__html: post.content}} />
              <p>Created on {post.dateCreated}</p>
              <p>Published on {post.datePublished}</p>
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