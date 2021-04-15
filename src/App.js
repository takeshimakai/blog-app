import { Switch, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import PostList from './components/post/PostList';
import Login from './components/Login';
import Signup from './components/Signup';
import { useEffect, useState } from 'react';

function App() {
  const [tokenIsValid, setTokenIsValid] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    verifyToken();
  }, []);

  const verifyToken = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      fetch('http://localhost:5000/user/verifytoken', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        }
      })
      .then(res => {
        if (res.ok) {
          setTokenIsValid(true);
          if (user.isAdmin) {
            setIsAdmin(true);
          }
        } else {
          localStorage.removeItem('user');
          setTokenIsValid(false);
        }
      })
      .catch(err => console.log(err));
    }
  }

  return (
    <div className="App">
      <Navbar tokenIsValid={tokenIsValid} />
      {!tokenIsValid && <Login verifyToken={verifyToken} setIsAdmin={setIsAdmin} />}
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
