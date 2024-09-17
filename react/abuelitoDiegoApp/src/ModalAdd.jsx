import React, { useState } from 'react';
import {Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import Button from '@mui/material/Button';
import '@mui/material/styles';

export const ModalAdd = ({ nombre }) => {

  const [show, setShow] = useState(false);
  const [categoryName, setCategoryName] = useState(''); 

  const handleClose = () => setShow(false);
  const handleShow= () => setShow(true);


  // Manejar el cambio en el input
  const handleChange = (e) => {
    setCategoryName(e.target.value);
  };

  // Función para enviar los datos mediante axios
  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:5000/category', { name: categoryName });
      console.log('Categoría agregada:', response.data);
      handleClose();  // Cierra el modal después de guardar
    } catch (error) {
      console.error('Error al agregar la categoría:', error);
    }
  };
  return (
    <>
    <Button 
        variant="contained"
        color="primary"
        onClick={handleShow}>
      Mostrar mas
    </Button>

    <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Agregar {nombre}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form>
        <Form.Group controlId="Name">
          <Form.Label>Nombre de la {nombre}</Form.Label>
          <Form.Control 
            type="text" 
            placeholder={`Ingrese el nombre de la ${nombre}`} 
            value={categoryName}  
            onChange={handleChange}
            />
        </Form.Group>
      </Form>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="contained" color="error" onClick={handleClose}>
        Cerrar
      </Button>
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Guardar {nombre}
      </Button>
    </Modal.Footer>
  </Modal>
  </>
  )
}
