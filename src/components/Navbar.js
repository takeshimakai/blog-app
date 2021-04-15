const Navbar = (props) => {
  const { user } = props;

  return (
    <ul id='navbar'>
      {user && user.isAdmin &&
        <li>
          <a href='/new-post'>Create new post</a>
        </li>
      }
      <li>
        <a href='/'>Home</a>
      </li>
      {!user &&
        <li>
          <a href='/signup'>Sign up</a>
        </li>
      }
    </ul>
  )
}

export default Navbar;