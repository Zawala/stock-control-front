import { Grid, Box, Typography, Button } from "@mui/material";
import React, { Component } from "react";
import Products from "./Products";
import NewProductModal from "./newproductModal"; // Import the new modal component

export default class Inventory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false, // State to manage modal visibility
    };
  }
  toggleModal = () => {
    this.setState(prevState => ({ isModalOpen: !prevState.isModalOpen }));
 };

  render() {    const { isModalOpen } = this.state;


    return (
      <Box>
        <Grid container sx={{ mx: 3, p: 3 }}>
          <Grid item md={9}>
            <Box
              sx={{
                margin: 3,
                bgcolor: "white",
                borderRadius: 2,
                padding: 3,
                height: "100%",
              }}
            >
              <Typography variant="h5" sx={{ m: 3, fontWeight: "bold" }}>
                Inventory
              </Typography>
              <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginTop: 3,
            marginBottom:3,
          }}
        >
           <Button variant="contained" color="primary" onClick={this.toggleModal}>
          Add New Stock
        </Button>
        {/* Conditionally render the modal */}
        {isModalOpen && <NewProductModal onClose={this.toggleModal} />}
      </Box>
              <Products />
            </Box>
            
          </Grid>
          
          
        </Grid>
        {/* Add New Stock Button */}
       
      </Box>
    );
  }
}
