import { Switch, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import PostList from './components/post/PostList';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path='/'>
          <PostList />
        </Route>
        <Route exact path='/login'>
          <Login />
        </Route>
        <Route exact path='/signup'>
          <Signup />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
