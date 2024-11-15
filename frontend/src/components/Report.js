import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Report = () => {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('/api/reports/stats');
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching email stats', error);
      }
    };
    fetchStats();
  }, []);

  return (
    <div>
      <h2>Email Stats</h2>
      <ul>
        {stats.map((stat, index) => (
          <li key={index}>
            {stat._id}: {stat.count}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Report;
