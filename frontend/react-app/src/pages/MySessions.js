import React, { useEffect, useState } from 'react';
import { getMyBookings } from '../services/api';

export default function MySessions() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const token = localStorage.getItem('token');
      const res = await getMyBookings(token);
      setBookings(res.data);
    };
    fetch();
  }, []);

  return (
    <div className="container mt-4">
      <h3>My Booked Sessions</h3>
      {bookings.length === 0 ? (
        <p>No sessions yet.</p>
      ) : (
        <ul className="list-group">
          {bookings.map((b) => (
            <li className="list-group-item" key={b.id}>
              <strong>Date:</strong> {b.date} <br />
              <strong>Time:</strong> {b.time} <br />
              <strong>Topic:</strong> {b.topic}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
