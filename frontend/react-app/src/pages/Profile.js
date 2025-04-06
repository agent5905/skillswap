import React, { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { updateProfile } from '../services/api';

export default function Profile() {
  const { user, setUser } = useContext(AuthContext);
  const [form, setForm] = useState(user || {});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const res = await updateProfile(token, form);
      setUser(res.data);
      alert('Profile updated!');
    } catch (err) {
      alert(err.response?.data?.error || 'Update failed.');
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={form.name} onChange={handleChange} placeholder="Name" />
      <textarea name="bio" value={form.bio} onChange={handleChange} placeholder="Bio" />
      <input name="skills" value={form.skills} onChange={handleChange} placeholder="Comma-separated skills" />
      <select name="role" value={form.role} onChange={handleChange}>
        <option value="mentee">Mentee</option>
        <option value="mentor">Mentor</option>
      </select>
      <button type="submit">Save Profile</button>
    </form>
  );
}
