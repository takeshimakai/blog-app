import { Switch, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Navbar from './components/Navbar';
import PostList from './components/post/PostList';
import Login from './components/Login';
import Logout from './components/Logout';
import Signup from './components/Signup';
import PostForm from './components/PostForm';
import Error from './components/Error';

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  useEffect(() => {
    if (user) {
      verifyToken(user.token);
    }
  }, []);

  const verifyToken = (token) => {
    fetch('http://localhost:5000/user/verifytoken', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    .then(res => {
      if (!res.ok) {
        localStorage.removeItem('user');
        setUser();
      }
    })
    .catch(err => console.log(err));
  };

  return (
    <div className="App">
      <Navbar user={user} />
      {user
        ? <Logout setUser={setUser} />
        : <Login setUser={setUser} />
      }
      <Switch>
        <Route exact path='/new-post'>
          {user && user.isAdmin
            ? <PostForm />
            : <Error />
          }
        </Route>
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
