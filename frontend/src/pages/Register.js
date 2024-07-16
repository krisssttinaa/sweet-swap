import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [country, setCountry] = useState('');
  const history = useHistory();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://88.200.63.148:8288/api/users/register', {
        username, email, password, name, surname, country
      });
      localStorage.setItem('token', res.data.token);
      history.push('/profile');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
        <input type="text" value={surname} onChange={(e) => setSurname(e.target.value)} placeholder="Surname" />
        <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} placeholder="Country" />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;