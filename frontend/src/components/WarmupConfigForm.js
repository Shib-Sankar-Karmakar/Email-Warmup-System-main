import React, { useState } from 'react';
import axios from 'axios';

const WarmupConfigForm = () => {
  const [configData, setConfigData] = useState({
    userEmail: '',
    emailsPerDay: '',
    intervalMinutes: '',
    gradualIncrease: '',
  });

  const handleChange = (e) => {
    setConfigData({ ...configData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/warmup/set-config', configData);
      alert('Warmup configuration saved successfully');
    } catch (error) {
      console.error('Error saving warmup configuration', error);
      alert('Failed to save warmup configuration');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Warmup Configuration</h2>
      <input type="email" name="userEmail" placeholder="Your Email" value={configData.userEmail} onChange={handleChange} required />
      <input type="number" name="emailsPerDay" placeholder="Emails Per Day" value={configData.emailsPerDay} onChange={handleChange} required />
      <input type="number" name="intervalMinutes" placeholder="Interval Minutes" value={configData.intervalMinutes} onChange={handleChange} required />
      <input type="number" name="gradualIncrease" placeholder="Gradual Increase" value={configData.gradualIncrease} onChange={handleChange} required />
      <button type="submit">Save Configuration</button>
    </form>
  );
};

export default WarmupConfigForm;
