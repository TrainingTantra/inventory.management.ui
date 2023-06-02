import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { fetchusers } from '../../app/slices/userSlice';

const User = () => {
  const dispatch = useDispatch();
  const users = useSelector(state => state.user);
  useEffect(() => {
    dispatch(fetchusers());
  }, [])
  return (
    <div>
      <h2>User</h2>
      {users.loading && <div>Loading...</div>}
      {!users.loading && users.error ? <div>Error: {users.error}</div> : null}
      {!users.loading && users.users.length ? (
        users.users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))
      ) : null}
    </div>
  )
}

export default User