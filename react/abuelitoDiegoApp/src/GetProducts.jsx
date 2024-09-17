import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

// Estilos para el modal
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

export const GetProducts = () => {
  const [data, setData] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);  // Producto seleccionado

  // Manejar abrir/cerrar el modal
  const handleOpen = (product) => {
    setSelectedProduct(product);  // Establecer el producto que se va a editar
    setOpen(true);  // Abrir el modal
  };

  const handleClose = () => setOpen(false);  // Cerrar el modal

  // Obtener productos al montar el componente
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/products'); 
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    
    fetchData();
  }, []);

  // Función para manejar la actualización del producto (cuando envíes el formulario)
  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/products/${selectedProduct.id}`, selectedProduct);
      handleClose();  // Cerrar el modal después de actualizar
      const updatedData = data.map(product => 
        product.id === selectedProduct.id ? selectedProduct : product
      );
      setData(updatedData);
    } catch (error) {
      console.error('Error al actualizar el producto:', error);
    }
  };

  // Manejar el cambio en los campos del formulario de edición
  const handleChange = (e) => {
    setSelectedProduct({
      ...selectedProduct,
      [e.target.name]: e.target.value
    });

    
  };

  return (
    <div className="container table-responsive">
      <table className="table table-hover">
        <thead className="table-light">
          <tr>
            <th>Código</th>
            <th>Producto</th>
            <th>Descripción</th>
            <th>Categoría</th>
            <th>Stock</th>
            <th>Unidad</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {data ? (
            data.map((product) => (
              <tr key={product.id}>
                <td>{product.sku}</td>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{product.category}</td>
                <td>{product.stock}</td>
                <td>{product.unit}</td>
                <td>${product.price}</td>
                <td>
                  <Button 
                    variant="contained" 
                    color="success" 
                    onClick={() => handleOpen(product)}  // Abrir el modal con los datos del producto
                  >
                    Modificar
                  </Button>
                  <Button 
                    variant="contained" 
                    color="error" 
                    onClick={() => handleDelete(product.id)}
                  >
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr className="table-primary">
              <td colSpan="8">Esperando conexión a la base de datos</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal para editar el producto */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={style}>
          <h2 id="modal-title">Editar Producto</h2>
          {selectedProduct && (
            <form>
              <TextField
                label="Código"
                name="name"
                value={selectedProduct.sku}
                onChange={handleChange}  // Conectar handleChange
                fullWidth
                margin="normal"
              />
              <TextField
                label="Producto"
                name="name"
                value={selectedProduct.name}
                onChange={handleChange}  // Conectar handleChange
                fullWidth
                margin="normal"
              />
              <TextField
                label="Descripción"
                name="description"
                value={selectedProduct.description}
                onChange={handleChange}  // Conectar handleChange
                fullWidth
                margin="normal"
              />
              <TextField
                label="Categoria"
                name="category"
                value={selectedProduct.category}
                onChange={handleChange}  // Conectar handleChange
                fullWidth
                margin="normal"
              />
              <TextField
                label="Stock"
                name="stock"
                value={selectedProduct.stock}
                onChange={handleChange}  // Conectar handleChange
                fullWidth
                margin="normal"
              />
              <TextField
                label="Precio"
                name="price"
                value={selectedProduct.price}
                onChange={handleChange}  // Conectar handleChange
                fullWidth
                margin="normal"
              />
              {/* Agregar más campos según sea necesario */}
              <Button variant="contained" color="primary" onClick={handleUpdate}>
                Guardar cambios
              </Button>
              <Button variant="contained" color="secondary" onClick={handleClose} style={{ marginLeft: '10px' }}>
                Cancelar
              </Button>
            </form>
          )}
        </Box>
      </Modal>
    </div>
  );
};
