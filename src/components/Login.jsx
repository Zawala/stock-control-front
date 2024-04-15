// src/components/Login.jsx
import React, { useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';

export default function Login() {
 const [username, setUsername] = useState('');
 const [password, setPassword] = useState('');

 const handleLogin = async () => {
    // Implement your login logic here
    console.log('Login attempt with username:', username, 'and password:', password);
    // For example, you might send a request to your backend here
 };

 return (
    <div>
      <Typography variant="h4">Login</Typography>
      <TextField label="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button onClick={handleLogin}>Login</Button>
    </div>
 );
}