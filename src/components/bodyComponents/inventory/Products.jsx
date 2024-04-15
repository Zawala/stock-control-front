import { useState } from "react";
import { Avatar, Box, Button, Modal, Typography } from "@mui/material";
import React from "react";
import Product from "./Product";
import ProductModal from "./productModal";
import { DataGrid } from "@mui/x-data-grid";
import productList from "./productList";
export default function Products() {
  const [state, setState] = useState({ product: null, open: false });
 
  const handleOpen = (product) => {
     setState({ product: product, open: true });
  };
 
  const handleClose = () => {
     setState({ open: false });
  };
  const columns = [
    {
      field: "Code",
      headerName: "Code",
      width: 90,
      description: "id of the product",
      valueGetter: (params) => params.row.code,
    },
    {
      field: "product",
      headerName: "Product",
      width: 200,
      description: "",
      //same here we have the cell data which i will get the value of the cells in the tables cellData.row.fieldName

      renderCell: (cellData) => {
        console.log("the cell data is : ", cellData.row.name);
        return <Product productName={cellData.row.name} />;
      },
    },
    {
      field: "category",
      headerName: "Category",
      width: 200,
      description: "category of the product",
    },
    {
      field: "price",
      headerName: "Price",
      width: 150,
      description: "price of the product",
      valueGetter: (params) => "$" + params.row.price,
    },
    {
      field: "stock",
      headerName: "Stock",
      width: 200,
      description: "how many items in the stock",
      valueGetter: (params) => params.row.quantity + " pcs",
    },,
    {
      field: "details",
      headerName: "View Stock",
      width: 300,
      description: "the details of the stock",

      renderCell: (params) => {
        const product = params.row;
        return (
           <Button
             variant="contained"
             sx={{ bgcolor: "#504099" }}
             onClick={() => handleOpen(product)}
           >
             Stock Details
           </Button>
        );
       },
    },
  ];

  return (
    <div>
      <DataGrid
        sx={{ borderLeft: 0, borderRight: 0, borderRadius: 0 }}
        rows={productList}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10, 20]}
        checkboxSelection
      />
     <Modal open={state.open} onClose={handleClose}>
    <Box>
        <ProductModal product={state.product} />
    </Box>
    </Modal>
        
       {/* Render the productModal component */}
       
    </div>
    
  );
}
