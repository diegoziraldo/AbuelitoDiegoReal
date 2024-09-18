import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { MenuItem, Select, InputLabel, FormControl } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const ModalModify = ({ product, data, setData }) => {
  const [openUpdate, setOpenUpdate] = useState(false);
  const [selectedProductUpdate, setSelectedProductUpdate] = useState(null);  // Producto seleccionado
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/category');
        setCategories(response.data);
      } catch (error) {
        console.error('Error al obtener las categorías:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleOpenUpdate = (product) => {
    setSelectedProductUpdate(product);  
    setOpenUpdate(true);  
  };

  const handleCloseUpdate = () => setOpenUpdate(false);  // Cerrar el modal

  const handleUpdate = async () => {
    if (!selectedProductUpdate.name || !selectedProductUpdate.price || !selectedProductUpdate.stock) {
      alert("Por favor completa todos los campos obligatorios.");
      return;
    }
    try {
      await axios.put(`http://localhost:5000/products/${selectedProductUpdate.id}`, selectedProductUpdate);
      handleCloseUpdate();  // Cerrar el modal después de actualizar
      const updatedData = data.map(product =>
        product.id === selectedProductUpdate.id ? selectedProductUpdate : product
      );
      
      setData(updatedData);
    } catch (error) {
      console.error('Error al actualizar el producto:', error);
    }
  };

  const handleChange = (e) => {
    setSelectedProductUpdate({
      ...selectedProductUpdate,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      <Button
        variant="contained"
        color="success"
        onClick={() => handleOpenUpdate(product)}  // Abrir el modal con los datos del producto
      >
        Modificar
      </Button>

      <Modal
        open={openUpdate}
        onClose={handleCloseUpdate}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={style}>
          <h2 id="modal-title">Editar Producto</h2>
          {selectedProductUpdate && (
            <form>
              <TextField
                label="Código"
                name="sku"
                value={selectedProductUpdate.sku || ''}
                onChange={handleChange}  // Conectar handleChange
                fullWidth
                margin="normal"
              />
              <TextField
                label="Producto"
                name="name"
                value={selectedProductUpdate.name || ''}
                onChange={handleChange}  // Conectar handleChange
                fullWidth
                margin="normal"
              />
              <TextField
                label="Descripción"
                name="description"
                value={selectedProductUpdate.description || ''}
                onChange={handleChange}  // Conectar handleChange
                fullWidth
                margin="normal"
              />
              <FormControl fullWidth margin="normal">
                <InputLabel id="category-label">Categoria</InputLabel>
                <Select
                  label="Categoria"
                  labelId="category-label"
                  name="category"
                  value={selectedProductUpdate.category || ''}
                  onChange={handleChange}  // Conectar handleChange
                >
                  <MenuItem value=""></MenuItem>
                  {categories && categories.map((cat) => (
                    <MenuItem key={cat.id} value={cat.name}>
                      {cat.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                label="Stock"
                name="stock"
                value={selectedProductUpdate.stock || ''}
                onChange={handleChange}  // Conectar handleChange
                fullWidth
                margin="normal"
              />
              <TextField
                label="Precio"
                name="price"
                value={selectedProductUpdate.price || ''}
                onChange={handleChange}  // Conectar handleChange
                fullWidth
                margin="normal"
              />
              <Button variant="contained" color="primary" onClick={handleUpdate}>
                Guardar cambios
              </Button>
              <Button variant="contained" color="secondary" onClick={handleCloseUpdate} style={{ marginLeft: '10px' }}>
                Cancelar
              </Button>
            </form>
          )}
        </Box>
      </Modal>
    </>
  );
};
