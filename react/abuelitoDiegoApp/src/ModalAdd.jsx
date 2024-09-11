import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

export const ModalAdd = ({ nombre }) => {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow= () => setShow(true);
  return (
    <>
    <Button variant="primary" onClick={handleShow}>
    +
  </Button>
    <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Agregar {nombre}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form>
        <Form.Group controlId="Name">
          <Form.Label>Nombre de la {nombre}</Form.Label>
          <Form.Control type="text" placeholder={`Ingrese el nombre de la ${nombre}`} />
        </Form.Group>
      </Form>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        Cerrar
      </Button>
      <Button variant="primary" onClick={handleClose}>
        Guardar {nombre}
      </Button>
    </Modal.Footer>
  </Modal>
  </>
  )
}
