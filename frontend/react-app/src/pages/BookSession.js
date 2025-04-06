import React, { useState } from 'react';
import { bookSession } from '../services/api';

const mockMentors = [
  { id: '1', name: 'Alice Dev' },
  { id: '2', name: 'Bob Builder' }
];

const timeSlots = ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00'];

export default function BookSession() {
  const [form, setForm] = useState({
    mentorId: '',
    date: '',
    time: '',
    topic: ''
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    alert('Booking submitted:\n' + JSON.stringify(form, null, 2));
    try {
        const token = localStorage.getItem('token');
        await bookSession(token, form);
        alert('Session booked!');
        setForm({ mentorId: '', date: '', time: '', topic: '' });
      } catch (err) {
        alert(err.response?.data?.detail || 'Booking failed.');
      }
  };

  return (
    <form className="container" style={{ maxWidth: 500 }} onSubmit={handleSubmit}>
      <h3 className="mb-3">Book a Mentorship Session</h3>

      <label className="form-label">Select Mentor</label>
      <select className="form-select mb-3" name="mentorId" onChange={handleChange} required>
        <option value="">-- Choose a mentor --</option>
        {mockMentors.map((m) => (
          <option key={m.id} value={m.id}>{m.name}</option>
        ))}
      </select>

      <label className="form-label">Date</label>
      <input className="form-control mb-3" name="date" type="date" onChange={handleChange} required />

      <label className="form-label">Time Slot</label>
      <select className="form-select mb-3" name="time" onChange={handleChange} required>
        <option value="">-- Choose a time --</option>
        {timeSlots.map((t) => (
          <option key={t} value={t}>{t}</option>
        ))}
      </select>

      <label className="form-label">Topic</label>
      <textarea className="form-control mb-3" name="topic" onChange={handleChange} />

      <button className="btn btn-success w-100" type="submit">Request Session</button>
    </form>
  );
}
