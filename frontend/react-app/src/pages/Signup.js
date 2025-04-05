import React, { useState } from 'react';
import { register } from '../services/api';

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'mentee' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(form);
      alert('Registered! You can now log in.');
    } catch (err) {
      alert(err.response?.data?.error || 'Registration failed.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="password" placeholder="Password" type="password" onChange={handleChange} />
      <select name="role" onChange={handleChange}>
        <option value="mentee">Mentee</option>
        <option value="mentor">Mentor</option>
      </select>
      <button type="submit">Register</button>
    </form>
  );
}
