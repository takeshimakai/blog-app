import { useState } from 'react';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'email':
        setEmail(value);
        break;
      case 'username':
        setUsername(value);
        break;
      case 'password':
        setPassword(value);
        break;
      default:
        break;
    };
  };

  const handleSubmit = () => {
    const formData = { email, username, password };

    fetch('http://localhost:5000/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(res => res.json())
    .then(data => console.log('Success:', data))
    .catch(error => console.error('Error:', error));
  };

  return (
    <form id='signup' onSubmit={handleSubmit}>
      <label>
        Email:
        <input type='email' name='email' required onChange={handleInputChange} />
      </label>
      <label>
        Username:
        <input type='text' name='username' required onChange={handleInputChange} />
      </label>
      <label>
        Password:
        <input type='password' name='password' required onChange={handleInputChange} />
      </label>
      <input type='submit' value='Sign up' />
    </form>
  )
};

export default Signup;