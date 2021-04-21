import { useState, useContext } from 'react';

import UserContext from '../../context/UserContext';

const CommentForm = (props) => {
  const { postId, fetchComments } = props;
  const { currentUser, updateCurrentUser } = useContext(UserContext);

  const [value, setValue] = useState('');

  const handleInputChange = (e) => setValue(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`http://localhost:5000/comments/${postId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${currentUser.token}`
      },
      body: JSON.stringify({ comment: value, user: currentUser.id })
    })
    .then(res => {
      setValue('');
      if (res.ok) {
        fetchComments();
      }
      if (res.status === 401) {
        localStorage.removeItem('user');
        updateCurrentUser();
      }
    })
    .catch(err => console.log(err));
  };

  return (
    <form className='comment-form' onSubmit={handleSubmit}>
      <textarea value={value} onChange={handleInputChange} required />
      <button>Leave comment</button>
    </form>
  )
};

export default CommentForm;