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
    <form className="container" style={{ maxWidth: 400 }} onSubmit={handleSubmit}>
      <h2 className="mb-3">Sign Up</h2>
      <input className="form-control mb-2" name="name" placeholder="Name" onChange={handleChange} />
      <input className="form-control mb-2" name="email" placeholder="Email" onChange={handleChange} />
      <input className="form-control mb-2" name="password" placeholder="Password" type="password" onChange={handleChange} />
      <select className="form-select mb-3" name="role" onChange={handleChange}>
        <option value="mentee">Mentee</option>
        <option value="mentor">Mentor</option>
      </select>
      <button className="btn btn-primary w-100" type="submit">Register</button>
    </form>
  );
}
