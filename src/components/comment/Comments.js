import { useEffect, useState, useContext } from 'react';

import CommentForm from './CommentForm';
import UserContext from '../../context/UserContext';

const Comments = ({ postId }) => {
  const { currentUser } = useContext(UserContext);

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
      {currentUser && <CommentForm postId={postId} fetchComments={fetchComments} />}
    </div>
  )
};

export default Comments;