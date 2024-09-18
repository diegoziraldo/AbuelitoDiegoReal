import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';


export const ModalDelete = ({ product, data, setData }) => {
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedProductDelete, setSelectedProductDelete] = useState(null);

  const handleCloseDelete = () => setOpenDelete(false);

  const handleOpenDelete = (product) => {
    setSelectedProductDelete(product);
    setOpenDelete(true);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/products/${selectedProductDelete.id}`);
      console.log('Producto eliminado');
      // Filtra el array de productos y actualiza el estado
      const filteredData = data.filter(item => item.id !== selectedProductDelete.id);
      setData(filteredData);
      handleCloseDelete();
    } catch (error) {
      console.error('Error eliminando el producto:', error);
    }
  };

  return (
    <>
      <Button
        variant="contained"
        color="error"
        onClick={() => handleOpenDelete(product)}
      >
        Eliminar
      </Button>

      <Dialog
        open={openDelete}
        onClose={handleCloseDelete}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <DialogTitle>Confirmación</DialogTitle>
        <DialogContent>
          {selectedProductDelete && (
            <Typography variant="body1">
              ¿Deseas eliminar <b>{selectedProductDelete.name}</b>?
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleDelete}
            color="error"
          >
            Eliminar
          </Button>
          <Button onClick={handleCloseDelete} color="primary">
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
