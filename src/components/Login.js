import { useEffect, useState } from 'react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    console.log(username);
  }, [username]);

  useEffect(() => {
    console.log(password);
  }, [password]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
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

  return (
    <form id='login'>
      <label>
        Username:
        <input type='text' name='username' required onChange={handleInputChange} />
      </label>
      <label>
        Password:
        <input type='password' name='password' required onChange={handleInputChange} />
      </label>
      <button>Login</button>
    </form>
  )
};

export default Login;