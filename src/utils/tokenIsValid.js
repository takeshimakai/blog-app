const tokenIsValid = (token) => {
  return fetch('http://localhost:5000/user/verifytoken', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
  .then(res => res.ok ? true : false)
  .catch((err) => console.log(err));
};

export default tokenIsValid;