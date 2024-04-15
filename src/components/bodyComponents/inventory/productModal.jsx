import { Delete, DeleteOutline } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { toast } from 'react-toastify';
import Inventory from "./Inventory";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

export default function ProductModal({ product }) {

  const handleDeleteProductFromOrder = async (productId) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/products/${productId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      if (data.success) {
      console.log(data)
      toast.success(data.message, {
        onClose: () => window.location.reload(), // Reload the page when the toast is closed
      });
    }
   } catch (error) {
      console.error("Failed to delete product:", error);
      toast.error("Failed to delete product.",  // Reload the page when the toast is closed
      );
    }
  };
  const [productCode, setProductCode] = useState(product.code);
  const [productName, setProductName] = useState(product.name);
  const [productQuantity, setProductQuantity] = useState(product.quantity);
  const [productDescription, setProductDescription] = useState(product.description);
 
  // Handlers for input changes
  const handleCodeChange = (e) => setProductCode(e.target.value);
  const handleNameChange = (e) => setProductName(e.target.value);  
  const handleQuantityChange = (e) => setProductQuantity(e.target.value);
  const handleDescriptionChange = (e) => setProductDescription(e.target.value);
 
  // Placeholder for update logic
  const handleUpdateProduct = async () => {
    const url = `http://127.0.0.1:8000/api/products/${productCode}`; // Assuming productCode is the product ID
    const data = {
       code: productCode,
       name: productName,
       quantity: productQuantity,
       description: productDescription,
    };
   
    try {
       const response = await fetch(url, {
         method: 'PUT',
         headers: {
           'Content-Type': 'application/json',
           // Include any other headers your API requires
         },
         body: JSON.stringify(data),
       });
   
       if (!response.ok) {
         throw new Error(`HTTP error! status: ${response.status}`);
       }
   
       const responseData = await response.json();
       console.log("Product updated successfully:", responseData);
       // Optionally, show a toast notification or update the UI to reflect the changes
       toast.success("Product updated successfully.");
    } catch (error) {
       console.error("Failed to update product:", error);
       // Optionally, show a toast notification for the error
       toast.error("Failed to update product.");
    }
   };
  const tableRows = (
      <TableRow key={product.code}>
         <TableCell>
    <input
      type="text"
      value={product.code}
      readOnly
    
    />
 </TableCell>
     <TableCell>
    <input
    type="text"
    value={productName} // Use the state variable here
    onChange={handleNameChange} // Pass the function directly
    />
 </TableCell>
 <TableCell>
    <input
      type="number"
      value={productQuantity}
      onChange={handleQuantityChange}
    />
 </TableCell>
 <TableCell>
    <input
      type="text"
      value={productDescription}
      onChange={handleDescriptionChange}
    />
 </TableCell>
        <TableCell>
          <IconButton
            
          >
            <DeleteOutline color="error" />
          </IconButton>
        </TableCell>
      </TableRow>
    );

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
      }}
    >
      <Box sx={{ color: "black", display: "flex", flexDirection: "column" }}>
        <Typography variant="h6" sx={{ m: 3 }}>
          Inventory Details
        </Typography>
         <Box>
          <TableContainer sx={{ marginBottom: 3 }}>
            <Table>
              <TableHead>
                <TableRow>
                <TableCell>Product Code</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Stock Description</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* loop through the product list */}
                {tableRows}
              </TableBody>
            </Table>
          </TableContainer>
          <Paper
            elevation={0}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              m: 0,
            }}
          >
           <Button
          variant="contained"
          sx={{ bgcolor: "error.main", m: 3, px: 12 }}
          onClick={() => handleDeleteProductFromOrder(product.code)}
          >
          Delete Entry
          </Button>
            <ToastContainer />
            <Button
              variant="contained"
              sx={{ bgcolor: "#504099", m: 3, px: 12 }}
              onClick={() => handleUpdateProduct(product.code)}
            >
              Update Entry
            </Button>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}
