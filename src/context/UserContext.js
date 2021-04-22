import { createContext } from 'react';

const UserContext = createContext({
  currentUser: JSON.parse(localStorage.getItem('user')),
  updateCurrentUser: () => {}
});

export default UserContext;