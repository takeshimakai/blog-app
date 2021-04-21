import React from 'react';

const UserContext = React.createContext({
  currentUser: JSON.parse(localStorage.getItem('user')),
  updateCurrentUser: () => {}
});

export default UserContext;