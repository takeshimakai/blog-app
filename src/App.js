import { Switch, Route } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';

import Navbar from './components/Navbar';
import PostList from './components/post/PostList';
import Login from './components/Login';
import Logout from './components/Logout';
import Signup from './components/Signup';
import PostForm from './components/PostForm';
import Error from './components/Error';

import UserContext from './context/UserContext';
import tokenIsValid from './utils/tokenIsValid';

function App() {
  const [user, setUser] = useState({
    ...useContext(UserContext),
    updateCurrentUser: () => setUser({
      ...user,
      currentUser: JSON.parse(localStorage.getItem('user'))})
  });

  useEffect(() => {
    if (user.currentUser) {
      tokenIsValid(user.currentUser.token)
      .then(res => {
        if (res === false) {
          localStorage.removeItem('user');
          user.updateCurrentUser();
        }
      })
      .catch(err => console.log(err));
    }
  }, []);

  return (
    <UserContext.Provider value={user}>
      <div className="App">
        <Navbar />
        {user.currentUser
          ? <Logout />
          : <Login />
        }
        <Switch>
          <Route exact path='/new-post'>
            {user.currentUser && user.currentUser.isAdmin
              ? <PostForm />
              : <Error />
            }
          </Route>
          <Route exact path='/signup'>
            <Signup />
          </Route>
          <Route path='/'>
            <PostList />
          </Route>
        </Switch>
      </div>
    </UserContext.Provider>
  );
}

export default App;
