import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Navbar from './components/Navbar';
import PostList from './components/post/PostList';
import Login from './components/Login';
import Logout from './components/Logout';
import Signup from './components/Signup';
import PostForm from './components/PostForm';
import Error from './components/Error';

import tokenIsValid from './utils/tokenIsValid';

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  useEffect(() => {
    if (user) {
      tokenIsValid(user.token)
      .then(res => {
        if (res === false) {
          localStorage.removeItem('user');
          setUser();
        }
      })
      .catch(err => console.log(err));
    }
  }, []);

  return (
    <BrowserRouter>
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
          <Route exact path='/signup'>
            <Signup />
          </Route>
          <Route path='/'>
            <PostList user={user} />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
