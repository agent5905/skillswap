import React, { useEffect, useState } from 'react';
import { getMyBookings } from '../services/api';
import { parseISO, isAfter, format } from 'date-fns';

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

  const now = new Date();

  const upcoming = bookings
    .filter(b => isAfter(parseISO(`${b.date}T${b.time}`), now))
    .sort((a, b) => new Date(`${a.date}T${a.time}`) - new Date(`${b.date}T${b.time}`));

  const past = bookings
    .filter(b => !isAfter(parseISO(`${b.date}T${b.time}`), now))
    .sort((a, b) => new Date(`${b.date}T${b.time}`) - new Date(`${a.date}T${a.time}`));

  const renderSession = (b) => (
    <li className="list-group-item" key={b.id}>
      <strong>Time:</strong> {b.mentorName}<br />
      <strong>Date:</strong> {format(parseISO(b.date), 'MMM dd, yyyy')}<br />
      <strong>Time:</strong> {b.time}<br />
      <strong>Topic:</strong> {b.topic}<br />
      <strong>Status:</strong> {b.status}<br />
    </li>
  );

  return (
    <div className="container mt-4">
      <h3>Upcoming Sessions</h3>
      {upcoming.length === 0 ? (
        <p className="text-muted">No upcoming sessions.</p>
      ) : (
        <ul className="list-group mb-4">
          {upcoming.map(renderSession)}
        </ul>
      )}

      <h3>Past Sessions</h3>
      {past.length === 0 ? (
        <p className="text-muted">No past sessions.</p>
      ) : (
        <ul className="list-group">
          {past.map(renderSession)}
        </ul>
      )}
    </div>
  );
}
