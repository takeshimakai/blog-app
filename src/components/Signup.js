import { useState } from 'react';

const Signup = () => {
  const [values, setValues] = useState({email: '', username: '', password: ''});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({...values, [name]: value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:5000/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
  };

  return (
    <form id='signup' onSubmit={handleSubmit}>
      <label>
        Email:
        <input
          type='email'
          name='email'
          value={values.email}
          required
          onChange={handleInputChange}
        />
      </label>
      <label>
        Username:
        <input
          type='text'
          name='username'
          value={values.username}
          required
          onChange={handleInputChange}
        />
      </label>
      <label>
        Password:
        <input
          type='password'
          name='password'
          value={values.password}
          required
          onChange={handleInputChange}
        />
      </label>
      <input type='submit' value='Sign up' />
    </form>
  )
};

export default Signup;