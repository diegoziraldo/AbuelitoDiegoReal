import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { ModalAdd } from './ModalAdd';

export const AddProducts = () => {

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    stock: '',
    sku: '',
    image_url: '',
    brand: '',
    unit: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(`Producto a agregar: ` + formData.name);

    setFormData({
      name: '',
      description: '',
      category: '',
      price: '',
      stock: '',
      sku: '',
      image_url: '',
      brand: '',
      unit: ''

    });

    try {
      const response = await axios.post('http://localhost:5000/products', formData);
      console.log('Producto agregado:', response.data);
      // Handle successful response (e.g., clear form, show success message)
      setFormData({
        name: '',
        description: '',
        category: '',
        price: '',
        stock: '',
        sku: '',
        image_url: '',
        brand: '',
        unit: ''
      });
    } catch (error) {
      console.error('Error al agregar el producto:', error);

    }
  }

  return (
    <>
      <div className="container mt-5">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Nombre:</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label">Descripcion:</label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <label htmlFor="category" className="form-label">Categoria:</label>
          <div className="input-group mb-3">
            <select
              type="text"
              className="form-control"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="">Selecciona una categoría</option>
            </select>
            <ModalAdd nombre='categoria'/>
          </div>

          <div className="mb-3">
            <label htmlFor="price" className="form-label">Precio:</label>
            <input
              type="number"
              className="form-control"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="stock" className="form-label">Stock:</label>
            <input
              type="number"
              className="form-control"
              id="stock"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="sku" className="form-label">Código:</label>
            <input
              type="text"
              className="form-control"
              id="sku"
              name="sku"
              value={formData.sku}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="image_url" className="form-label">Imagen:</label>
            <input
              type="file"
              className="form-control"
              id="image_url"
              name="image_url"
              onChange={handleChange}
            />
          </div>

          <label htmlFor="brand" className="form-label">Marca:</label>
          <div className="input-group mb-3">
            <select
              type="text"
              className="form-control"
              id="brand"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
            >
              <option value="">Selecciona una marca</option>
            </select>
            <ModalAdd nombre='marca'/>
          </div>

          <label htmlFor="brand" className="form-label">Unidad:</label>
          <div className="input-group mb-3">
            <select
              type="text"
              className="form-control"
              id="unit"
              name="unit"
              value={formData.unit}
              onChange={handleChange}
            >
            <option value="">Selecciona una unidad</option>
            </select>
            <ModalAdd nombre='unidad'/>
          </div>

          <Button type="submit" className="btn btn-primary">Agregar Producto</Button>
        </form>
      </div>
    </>
  );
}
