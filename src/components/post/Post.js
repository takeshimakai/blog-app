import { useEffect, useState } from 'react';
import { useParams, Link, Switch, Route } from 'react-router-dom';

import PostForm from '../PostForm';

const Post = (props) => {
  const { posts, user, isLoading } = props;
  const { postId } = useParams();

  const [comments, setComments] = useState();
  const [newComment, setNewComment] = useState();

  useEffect(() => fetchComments(), []);

  const fetchComments = () => {
    fetch(`http://localhost:5000/comments/${postId}`)
    .then(res => res.json())
    .then(data => {
      setComments(data);
    })
    .catch(err => console.log(err))
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    setNewComment(value);
  };

  const postComment = async (e) => {
    e.preventDefault();

    fetch(`http://localhost:5000/comments/${postId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      },
      body: JSON.stringify({ comment: newComment, user: user.id })
    })
    .then(res => console.log(res))
    .catch(err => console.log(err));
  }

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
              {comments &&
                <div className='comments'>
                  {comments.map(comment => (
                    <div className='comment' key={comment._id}>
                      <p>{comment.comment}</p>
                      <p>Submitted by: {comment.user.username}</p>
                    </div>
                  ))}
                  {user &&
                    <form className='comment-form' onSubmit={postComment}>
                      <textarea name='comment' onChange={handleInputChange} />
                      <button>Leave comment</button>
                    </form>
                  }
                </div>
              }
            </div>
          : <p>Loading...</p>
        }
      </Route>
    </Switch>
  )
}

export default Post;