import { useState, useContext } from 'react';

import UserContext from '../context/UserContext';

const Login = () => {
  const { updateCurrentUser } = useContext(UserContext);

  const [values, setValues] = useState({username: '', password: ''});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({...values, [name]: value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      });
      
      const user = await res.json();

      if (res.ok) {
        localStorage.setItem('user', JSON.stringify(user));
        updateCurrentUser();
      } else {
        throw user;
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <form id='login' onSubmit={handleSubmit}>
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
      <input type='submit' value='Login' />
    </form>
  )
};

export default Login;