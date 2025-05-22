import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3000/session', {
      credentials: 'include', // Important: sends the session cookie!
    })
      .then(res => res.json())
      .then(data => {
        if (data.user) {
          setUser(data.user);
        } else {
          navigate('/');
        }
      });
  }, [navigate]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ color: 'white' }}>
      <h1>Logged in with email {user.email}</h1>
    </div>
  );
}

export default Dashboard;