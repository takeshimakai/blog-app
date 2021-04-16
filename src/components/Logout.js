const Logout = (props) => {
  const { setUser } = props;

  const logout = () => {
    localStorage.removeItem('user');
    setUser();
  };

  return (
    <button onClick={logout}>Logout</button>
  )
};

export default Logout;