const Navbar = (props) => {
  return (
    <ul id='navbar'>
      <li>
        <a href='/'>Home</a>
      </li>
      {!props.tokenIsValid &&
        <li>
          <a href='/signup'>Sign up</a>
        </li>
      }
    </ul>
  )
}

export default Navbar;