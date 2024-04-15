// src/components/Login.jsx
import React, { useState } from 'react';
import { Button, TextField, Typography, Box, Avatar, Paper } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock'; // Import the Lock icon
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';



export default function Login() {
 const [username, setUsername] = useState('');
 const [password, setPassword] = useState('');
 const navigate = useNavigate();



 const handleLogin = async () => {
    // Base URL of your Laravel application
    const base_url = "http://127.0.0.1:8000";

    // Login endpoint
    const login_url = `${base_url}/api/login`;

    // Headers to indicate that we expect a JSON response
    const headers = { 'Accept': 'application/json', 'Content-Type': 'application/json',};

    const login_data = {
      "email": username, // Assuming 'username' is the email
      "password": password
    };
    console.log( JSON.stringify(login_data),)

    try {
      const login_response = await fetch(login_url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(login_data),
      });

      if (login_response.status === 201) {
        
        toast.success('User logged in successfully.', {
            onClose: () => navigate('/home'),
          });
        // Here you can handle the successful login, e.g., redirect the user to another page
      } else {
        console.log("Failed to log in user.");
        toast.error(await login_response.text());
        // Handle login failure, e.g., show an error message
      }
    } catch (error) {
      console.error("Error during login:", error);
      // Handle network errors or other issues
    }
 };

 return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', // This makes the Box take up the full viewport height
        backgroundColor: 'theme.palette.background.default', // This ensures the background color follows the app's theme
      }}
    >
      <Box
        component="form"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: "center", 
          gap: 2, // This adds some space between the form elements
          padding: 2, // Adds some padding around the form
          backgroundColor: 'theme.palette.background.paper', // This ensures the form background color follows the app's theme
          borderRadius: 1, // Adds a slight border radius to the form
          boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', // Adds a shadow to the form
          border: 'none', // Removes the border
          width: '100%', // Ensures the form takes up the full width of its container
          maxWidth: 400, // Sets a maximum width for the form
          margin: '0 auto', // Centers the form horizontally
        }}
      >
        <Paper elevation={0} sx={{ justifyContent: "center", display: "flex", backgroundColor: 'transparent' }}>
          <Avatar sx={{ mb: 2, bgcolor: 'theme.palette.primary.main', width: 100, height: 100, marginBottom: 10 }}>
            <LockIcon sx={{ width: '50%', height: '50%' }} />
          </Avatar>
        </Paper>
        
        <TextField label="Username" value={username} onChange={(e) => setUsername(e.target.value)} fullWidth sx={{ border: 'none' }} />
        <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} fullWidth sx={{ border: 'none' }} />
        <Button onClick={handleLogin} fullWidth>Login</Button>
        <ToastContainer />
      </Box>
    </Box>
 );
}