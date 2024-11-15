import React, { useState } from 'react';
import axios from 'axios';

const EmailForm = () => {
  const [emailData, setEmailData] = useState({
    host: '',
    port: '',
    email: '',
    appPassword: '',
    fromName: '',
    fromEmail: '',
    to: '',
    subject: '',
    emailBody: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setEmailData({ ...emailData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await axios.post('http://localhost:5000/api/emails/send', emailData); // Ensure the backend URL is correct
      alert('Email sent successfully');
      // Reset form
      setEmailData({
        host: '',
        port: '',
        email: '',
        appPassword: '',
        fromName: '',
        fromEmail: '',
        to: '',
        subject: '',
        emailBody: '',
      });
    } catch (error) {
      console.error('Error sending email', error);
      setError(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Send Email</h2>
      <input
        type="text"
        name="host"
        placeholder="SMTP Host"
        value={emailData.host}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="port"
        placeholder="SMTP Port"
        value={emailData.port}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Your Email"
        value={emailData.email}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="appPassword"
        placeholder="App Password"
        value={emailData.appPassword}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="fromName"
        placeholder="From Name"
        value={emailData.fromName}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="fromEmail"
        placeholder="From Email"
        value={emailData.fromEmail}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="to"
        placeholder="Recipient Email"
        value={emailData.to}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="subject"
        placeholder="Subject"
        value={emailData.subject}
        onChange={handleChange}
        required
      />
      <textarea
        name="emailBody"
        placeholder="Email Body"
        value={emailData.emailBody}
        onChange={handleChange}
        required
      ></textarea>
      <button type="submit" disabled={loading}>
        {loading ? 'Sending...' : 'Send Email'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

export default EmailForm;
