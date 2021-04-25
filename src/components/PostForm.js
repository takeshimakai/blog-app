import { useContext, useEffect, useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import UserContext from '../context/UserContext';

const PostForm = ({ post, isNewPost }) => {
  const { currentUser } = useContext(UserContext);

  const [values, setValues] = useState({ title: '', content: '' });
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (post) {
      const parser = new DOMParser();
      for (const prop in post) {
        if (prop === 'title' || prop === 'content') {
          post[prop] = parser.parseFromString(post[prop], 'text/html').body.textContent;
        }
      }
      setValues({...values, ...post});
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({...values, [name]: value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let path;
      let opt = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${currentUser.token}`
        },
      };
  
      switch (e.target.name) {
        case 'save':
          path = isNewPost ? '' : `${post._id}`;
          opt.method = isNewPost ? 'POST' : 'PUT';
          opt.body = JSON.stringify({ ...values, published: false });
          break;
        case 'publish':
          path = isNewPost ? '' : `${post._id}`;
          opt.method = isNewPost ? 'POST' : 'PUT';
          opt.body = JSON.stringify({ ...values, published: true });
          break;
        case 'unpublish':
          path = `${post._id}`;
          opt.method = 'PUT';
          opt.body = JSON.stringify({ ...values, published: false });
          break;
        case 'delete':
          path = `${post._id}`;
          opt.method = 'DELETE';
          break;
        default:
          break;
      }
  
      const res = await fetch(`http://localhost:5000/posts/${path}`, opt);
      
      if (res.ok) {
        setRedirect(true);
      }
  
      if (res.status === 400) {
        const data = await res.json();
        throw data;
      }

    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Switch>
      {redirect && <Redirect to='/' />}
      <Route>
        <form className='post-form'>
          <div className='input-container'>
            <label htmlFor='title'>Title:</label>
            <input
              id='title'
              name='title'
              type='text'
              value={values.title}
              required
              onChange={handleInputChange}
            />
          </div>
          <div className='input-container'>
            <label htmlFor='content'>Content:</label>
            <textarea
              id='content'
              name='content'
              value={values.content}
              required
              onChange={handleInputChange}
            />
          </div>
          <input type='submit' name='save' value='Save' onClick={handleSubmit} />
          <input type='submit' name='publish' value='Save and publish' onClick={handleSubmit} />
          {post && post.published && <input type='submit' name='unpublish' value='Unpublish' onClick={handleSubmit} />}
          {!isNewPost && <input type='submit' name='delete' value='Delete' onClick={handleSubmit} />}
          {isNewPost && <input type='button' value='Cancel' onClick={() => setRedirect(true)} />}
        </form>
      </Route>
    </Switch>
  )
};

export default PostForm;