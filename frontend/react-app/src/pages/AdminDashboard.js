import React, { useEffect, useState } from 'react';
import { getAllUsers, getAllBookings, updateUserRole, deleteBooking } from '../services/api';

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const handleRoleToggle = async (user) => {
    const token = localStorage.getItem('token');
    const newRole = user.role === 'admin' ? 'mentee' : 'admin';
    await updateUserRole(token, user.id, newRole);
    setUsers(users.map(u => u.id === user.id ? { ...u, role: newRole } : u));
  };
  const handleDeleteBooking = async (id) => {
    const token = localStorage.getItem('token');
    await deleteBooking(token, id);
    setBookings(bookings.filter(b => b.id !== id));
  };
  

  useEffect(() => {
    const token = localStorage.getItem('token');
    getAllUsers(token).then(res => setUsers(res.data)).catch(console.error);
    getAllBookings(token).then(res => setBookings(res.data)).catch(console.error);
  }, []);

  return (
    <div className="container mt-4">
      <h2>Admin Dashboard</h2>
      {users?.role === 'admin' && (
        <p className="text-info fw-bold">Admin Mode</p>
      )}
      <h4 className="mt-4">Users</h4>
      <table className="table table-bordered">
        <thead><tr><th>Name</th><th>Email</th><th>Role</th></tr></thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td><button className="btn btn-sm btn-warning" onClick={() => handleRoleToggle(u)}>
                    {u.role === 'admin' ? 'Revoke Admin' : 'Make Admin'}
                  </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h4 className="mt-4">Bookings</h4>
      <table className="table table-bordered">
        <thead><tr><th>User</th><th>Mentor</th><th>Date</th><th>Time</th><th>Status</th></tr></thead>
        <tbody>
          {bookings.map(b => (
            <tr key={b.id}>
              <td>{b.userId}</td>
              <td>{b.mentorId}</td>
              <td>{b.date}</td>
              <td>{b.time}</td>
              <td>{b.status}</td>
              <td><button className="btn btn-sm btn-danger" onClick={() => handleDeleteBooking(b.id)}>
                    Delete
                  </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
