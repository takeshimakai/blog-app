import { useEffect, useState } from 'react';

const Login = () => {
  const [values, setValues] = useState({username: '', password: ''});

  /*
  useEffect(() => {
    localStorage.clear();
    console.log(localStorage.length);
  }, []);
  */

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({...values, [name]: value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    })
    .then(res => res.json())
    .then(data => localStorage.setItem('token', JSON.stringify(data)))
    .then(console.log(JSON.parse(localStorage.getItem('token'))))
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