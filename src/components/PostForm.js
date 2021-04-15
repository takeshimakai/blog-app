import { useState } from 'react';

const PostForm = () => {
  const [values, setValues] = useState({ title: '', content: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({...values, [name]: value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const { token } = JSON.parse(localStorage.getItem('user'));
    let path;
    let opt;

    switch (e.target.name) {
      case 'save':
        path = '';
        opt = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
        break;
      case 'publish':
        console.log('publish');
        break;
      case 'unpublish':
        console.log('unpublish');
        break;
      case 'discard':
        console.log('discard');
        break;
      default:
        break;
    }

    await fetch(`http://localhost:5000/${path}`, opt);
  }

  return (
    <form>
      <div className='input-container'>
        <label htmlFor='title'>Title:</label>
        <input id='title' name='title' type='text' required onChange={handleInputChange} />
      </div>
      <div className='input-container'>
        <label htmlFor='content'>Content:</label>
        <textarea id='content' name='content' required onChange={handleInputChange} />
      </div>
      <input type='submit' name='save' value='Save' onClick={handleSubmit} />
      <input type='submit' name='publish' value='Save and publish' onClick={handleSubmit} />
      <input type='submit' name='unpublish' value='Unpublish' onClick={handleSubmit} />
      <input type='submit' name='discard' value='Discard' onClick={handleSubmit} />
    </form>
  )
};

export default PostForm;