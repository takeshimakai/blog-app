import { Switch, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import PostList from './components/post/PostList';
import Login from './components/Login';
import Signup from './components/Signup';
import PostForm from './components/PostForm';
import { useEffect, useState } from 'react';

function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('user')));
  }, []);

  useEffect(() => {
    if (user) {
      verifyToken(user.token);
    }
  }, [user])

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
      {!user && <Login setUser={setUser} />}
      <Switch>
        <Route exact path='/new-post'>
          <PostForm />
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
