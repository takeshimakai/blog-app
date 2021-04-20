import { useEffect, useState } from 'react';

import CommentForm from './CommentForm';

const Comments = (props) => {
  const { postId, user } = props;

  const [comments, setComments] = useState([]);

  useEffect(() => fetchComments(), []);

  const fetchComments = () => {
    fetch(`http://localhost:5000/comments/${postId}`)
    .then(res => res.json())
    .then(data => setComments(data))
    .catch(err => console.log(err))
  };

  return (
    <div className='comments'>
      {comments.map(comment => (
        <div className='comment' key={comment._id}>
          <p>{comment.comment}</p>
          <p>Submitted by <b>{comment.user.username}</b> on {comment.timestamp}</p>
        </div>
      ))}
      {user && <CommentForm postId={postId} user={user} fetchComments={fetchComments} />}
    </div>
  )
};

export default Comments;