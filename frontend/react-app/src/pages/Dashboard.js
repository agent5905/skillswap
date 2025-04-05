import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export default function Dashboard() {
  const { user, logout } = useContext(AuthContext);

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h2>Welcome, {user.name}!</h2>
      <p>Role: {user.role}</p>
      <p>Email: {user.email}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
