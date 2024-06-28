import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/sessions`)
      .then(response => setSessions(response.data))
      .catch(error => console.error('Error fetching sessions:', error));
  }, []);

  const createSession = () => {
    axios.post(`${process.env.REACT_APP_API_URL}/api/sessions`)
      .then(response => setSessions([...sessions, response.data]))
      .catch(error => console.error('Error creating session:', error));
  };

  const deleteSession = (id) => {
    axios.delete(`${process.env.REACT_APP_API_URL}/api/sessions/${id}`)
      .then(() => setSessions(sessions.filter(session => session.id !== id)))
      .catch(error => console.error('Error deleting session:', error));
  };

  return (
    <div>
      <h1>Disposable Browser Sessions</h1>
      <button onClick={createSession}>Create New Session</button>
      <ul>
        {sessions.map(session => (
          <li key={session.id}>
            Session ID: {session.id}
            <button onClick={() => deleteSession(session.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
