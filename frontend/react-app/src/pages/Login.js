import React, { useState } from 'react';
import { login } from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(form);
      localStorage.setItem('token', res.data.token);
      // Redirect to dashboard
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.error || 'Login failed.');
    }
  };

  return (
    <form className="container" style={{ maxWidth: 400 }} onSubmit={handleSubmit}>
      <input className="form-control mb-2" name="email" placeholder="Email" onChange={handleChange} />
      <input className="form-control mb-2" name="password" placeholder="Password" type="password" onChange={handleChange} />
      <button className="btn btn-primary w-100" type="submit">Login</button>
    </form>
  );
}
