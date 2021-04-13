import { useState } from 'react';

const Login = () => {
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
      
      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('token', data);
        console.log(localStorage.getItem('token'));
      } else {
        throw data;
      }
    }
    catch (err) {
      console.log(err);
    }
  }

  return (
    <form id='login' onSubmit={handleSubmit}>
      <label>
        Username:
        <input type='text' name='username' required onChange={handleInputChange} />
      </label>
      <label>
        Password:
        <input type='password' name='password' required onChange={handleInputChange} />
      </label>
      <input type='submit' value='Login' />
    </form>
  )
};

export default Login;