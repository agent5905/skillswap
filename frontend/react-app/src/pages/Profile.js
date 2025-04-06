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

  if (!user) return <div className="text-center mt-5"><div className="spinner-border text-primary" role="status"></div></div>;

  return (
    <form className="container" style={{ maxWidth: 400 }} onSubmit={handleSubmit}>
      <input className="form-control mb-2" name="name" value={form.name} onChange={handleChange} placeholder="Name" />
      <textarea className="form-control mb-2" name="bio" value={form.bio} onChange={handleChange} placeholder="Bio" />
      <input className="form-control mb-2" name="skills" value={form.skills} onChange={handleChange} placeholder="Comma-separated skills" />
      <select className="form-select mb-3" name="role" value={form.role} onChange={handleChange}>
        <option value="mentee">Mentee</option>
        <option value="mentor">Mentor</option>
      </select>
      <button className="btn btn-primary w-100" type="submit">Save Profile</button>
    </form>
  );
}
