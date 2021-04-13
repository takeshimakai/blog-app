import { Switch, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import PostList from './components/post/PostList';
import Login from './components/Login';
import Signup from './components/Signup';
import { useEffect, useState } from 'react';

function App() {
  const [tokenIsValid, setTokenIsValid] = useState(false);

  useEffect(() => {
    verifyToken();
  }, []);

  const verifyToken = () => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch('http://localhost:5000/user/verifytoken', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      .then(res => {
        if (res.ok) {
          setTokenIsValid(true);
        } else {
          localStorage.removeItem('token');
          setTokenIsValid(false);
        }
      })
      .catch(err => console.log(err));
    }
  }

  return (
    <div className="App">
      <Navbar />
      {!tokenIsValid && <Login />}
      <Switch>
        <Route exact path='/'>
          <PostList />
        </Route>
        <Route exact path='/signup'>
          <Signup />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
