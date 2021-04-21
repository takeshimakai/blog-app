import { useContext } from 'react';
import UserContext from '../context/UserContext';

const Navbar = () => {
  const { currentUser } = useContext(UserContext);

  return (
    <ul id='navbar'>
      {currentUser && currentUser.isAdmin &&
        <li>
          <a href='/new-post'>Create new post</a>
        </li>
      }
      <li>
        <a href='/'>Home</a>
      </li>
      {!currentUser &&
        <li>
          <a href='/signup'>Sign up</a>
        </li>
      }
    </ul>
  )
}

export default Navbar;