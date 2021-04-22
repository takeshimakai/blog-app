import { useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

const Signup = () => {
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [values, setValues] = useState({email: '', username: '', password: ''});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({...values, [name]: value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      })
  
      if (res.ok) {
        setIsSignedUp(true);
      }
  
      if (res.status === 400) {
        const data = await res.json();
        throw data;
      }

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Switch>
      {isSignedUp && <Redirect to='/' />}
      <Route path='/signup'>
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
      </Route>
    </Switch>
  )
};

export default Signup;