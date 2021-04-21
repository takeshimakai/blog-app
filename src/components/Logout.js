import { useContext } from 'react';

import UserContext from '../context/UserContext';

const Logout = () => {
  const { updateCurrentUser } = useContext(UserContext);

  const logout = () => {
    localStorage.removeItem('user');
    updateCurrentUser();
  };

  return (
    <button onClick={logout}>Logout</button>
  )
};

export default Logout;