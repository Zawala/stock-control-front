import { Delete, DeleteOutline } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  Paper,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';


export default function NewProductModal() {
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
 
  const handleSubmit = async (event) => {
     event.preventDefault(); // Prevent the default form submission behavior
 
     const url = 'http://127.0.0.1:8000/api/products/'; // Replace with your actual base URL
     const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
       // Add any other headers you need
     };
 
     const data = {
       code,
       name,
       quantity,
       price,
       description,
     };
 
     try {
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log(responseData);
      // Display a toast notification with the success message and reload the page when the toast is closed
      toast.success(responseData.message, {
        onClose: () => window.location.reload(), // Reload the page when the toast is closed
      });
    } catch (error) {
      console.error("Failed to submit form:", error);
      // Display a toast notification with the error message
      toast.error("Failed to submit form.", {
        onClose: () => window.location.reload(), // Optionally, reload the page when the toast is closed
      });
    }
 
  };
 
  return (
    <Box
      sx={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        width: "50%",
        bgcolor: "white",

        borderRadius: 2,
        boxShadow: 24,
        p: 4,
        zIndex: 1000,
      }}
    >
      <Box sx={{ color: "black", display: "flex", flexDirection: "column" }}>
        <Typography variant="h6" sx={{ m: 3 }}>
          New Stock
        </Typography>
        <Paper
          elevation={0}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "30%",
            m: 3,
          }}
        >
        
          </Paper>
          <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="subtitle1">Code</Typography>
            <TextField fullWidth variant="outlined" required value={code} onChange={(e) => setCode(e.target.value)} />
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle1">Name</Typography>
            <TextField fullWidth variant="outlined" required value={name} onChange={(e) => setName(e.target.value)} />
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle1">Quantity</Typography>
            <TextField fullWidth variant="outlined" type="number" required value={quantity} onChange={(e) => setQuantity(e.target.value)} />
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle1">Price</Typography>
            <TextField fullWidth variant="outlined" type="number" required value={price} onChange={(e) => setPrice(e.target.value)} />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1">Description</Typography>
            <TextField fullWidth variant="outlined" multiline rows={4} value={description} onChange={(e) => setDescription(e.target.value)} />
          </Grid>
        </Grid>
       
        <Button
          variant="contained"
          sx={{ bgcolor: "#504099", m: 3, px: 12 }}
          type="submit"
        >
          Create Entry
        </Button>
        <ToastContainer />
      </form>
        </Box>
      </Box>
    
  );
}
