import React, { useState } from 'react';
import { Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import Button from '@mui/material/Button';
import { TextField, Box } from '@mui/material';
import { styled } from '@mui/system';

const StyledForm = styled(Box)(({ theme }) => ({
  '& .MuiTextField-root': {
    margin: theme.spacing(1),
    width: '25ch',
  },
}));

export const ModalAdd = ({ nombre }) => {
  const [modals, setModals] = useState({
    show: false,
    showAdd: false,
    showUpdate: false,
    showDelete: false,
    categoryName: ''
  });

  const handleCloseModal = () => {
    setModals(prevState => ({
      ...prevState,
      show: false,
      showAdd: false,
      showUpdate: false,
      showDelete: false,
      categoryName: ''
    }));
  };

  const handleShowModal = (modalType) => {
    setModals(prevState => ({
      ...prevState,
      show: true,
      [modalType]: true
    }));
    // Cerrar cualquier otro modal abierto
    Object.keys(modals).forEach(key => {
      if (key !== modalType && key !== 'categoryName') {
        setModals(prevState => ({
          ...prevState,
          [key]: false
        }));
      }
    });
  };

  const handleChange = (e) => {
    setModals(prevState => ({
      ...prevState,
      categoryName: e.target.value
    }));
  };

  const handleAdd = async () => {
    try {
      const response = await axios.post('http://localhost:5000/category', { name: modals.categoryName });
      console.log('Categoría agregada:', response.data);
      handleCloseModal();
    } catch (error) {
      console.error('Error al agregar la categoría:', error);
    }
  };
  const handleUpdate = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/category/${modals.categoryName}`, { name: modals.categoryName });
      console.log('Categoría actualizada:', response.data);
      handleCloseModal();
    } catch (error) {
      console.error('Error al actualizar la categoría:', error);
    }
  };
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/category/${modals.categoryName}`);
      console.log('Categoría eliminada');
      handleCloseModal();
    } catch (error) {
      console.error('Error al eliminar la categoría:', error);
    }
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleShowModal('show')}
      >
        Mostrar más
      </Button>

      <Modal show={modals.show} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Acciones de {nombre}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <StyledForm>
            <TextField
              label="Nombre"
              name="categoryName"
              value={modals.categoryName || ''}
              onChange={handleChange}
              fullWidth
            />
            <div className="row">
              <div className="col-md-4">
                <Button variant="contained" color="primary" onClick={handleShowModal.bind(null, 'showAdd')}>
                  Agregar {nombre}
                </Button>
              </div>
              <div className="col-md-4">
                <Button variant="contained" color="success" onClick={handleShowModal.bind(null, 'showUpdate')}>
                  Modificar {nombre}
                </Button>
              </div>
              <div className="col-md-4">
                <Button variant="contained" color="error" onClick={handleShowModal.bind(null, 'showDelete')}>
                  Eliminar {nombre}
                </Button>
              </div>
            </div>
          </StyledForm>
        </Modal.Body>
        <Modal.Footer>
          {/* Agregar contenido del pie de página si es necesario */}
        </Modal.Footer>
      </Modal>

      <Modal show={modals.showAdd} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar {nombre}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <StyledForm>
            <TextField
              label="Nombre"
              name="categoryName"
              value={modals.categoryName || ''}
              onChange={handleChange}
              fullWidth
            />
            <Button variant="contained" color="primary" onClick={handleAdd}>
              Agregar
            </Button>
          </StyledForm>
        </Modal.Body>
        <Modal.Footer>
          {/* Agregar contenido del pie de página si es necesario */}
        </Modal.Footer>
      </Modal>

      <Modal show={modals.showUpdate} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Modificar {nombre}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <StyledForm>
            <TextField
              label="Nombre"
              name="categoryName"
              value={modals.categoryName || ''}
              onChange={handleChange}
              fullWidth
            />
            <Button variant="contained" color="primary" onClick={handleUpdate}>
              Actualizar
            </Button>
          </StyledForm>
        </Modal.Body>
        <Modal.Footer>
          {/* Agregar contenido del pie de página si es necesario */}
        </Modal.Footer>
      </Modal>

      <Modal show={modals.showDelete} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Eliminar {nombre}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>¿Estás seguro de que deseas eliminar {nombre}? Esta acción no se puede deshacer.</p>
          <Button variant="contained" color="error" onClick={handleDelete}>
            Eliminar
          </Button>
        </Modal.Body>
        <Modal.Footer>
          {/* Agregar contenido del pie de página si es necesario */}
        </Modal.Footer>
      </Modal>
    </>
  );
};
