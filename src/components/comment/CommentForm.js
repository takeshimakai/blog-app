import { useState } from 'react';

const CommentForm = (props) => {
  const { postId, user, fetchComments } = props;

  const [value, setValue] = useState('');

  const handleInputChange = (e) => setValue(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`http://localhost:5000/comments/${postId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      },
      body: JSON.stringify({ comment: value, user: user.id })
    })
    .then(res => {
      setValue('');
      if (res.ok) {
        fetchComments();
      }
      if (res.status === 401) {
        
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