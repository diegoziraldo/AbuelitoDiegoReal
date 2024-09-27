import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { ModalAdd } from './ModalAdd';
import { UpdateProduct } from './UpdateProduct';

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





  
  const handleSubmit = async (event) => {
    event.preventDefault();
  // Crear un objeto FormData para manejar la imagen y los demás datos
  const formDataToSend = new FormData();
  formDataToSend.append('name', formData.name);
  formDataToSend.append('description', formData.description);
  formDataToSend.append('category', formData.category);
  formDataToSend.append('price', formData.price);
  formDataToSend.append('stock', formData.stock);
  formDataToSend.append('sku', formData.sku);
  formDataToSend.append('brand', formData.brand);
  formDataToSend.append('unit', formData.unit);

  if (formData.image_url) {
    formDataToSend.append('image', formData.image_url);  // Asegúrate de que 'image' es el nombre que espera el servidor
  }

  try {
    const response = await axios.post('http://localhost:5000/products', formDataToSend, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log('Producto agregado:', response.data);
  } catch (error) {
    console.error('Error al agregar el producto:', error);
  }
};


// Modifica el handleChange para guardar el archivo en el estado
const handleChange = (event) => {
  const { name, value, files } = event.target;

  if (name === 'image_url') {
    setFormData((prevData) => ({ ...prevData, image_url: files[0] })); // Almacena el archivo en el estado
  } else {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  }
};




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
              {categories.map((cat)=>(
                <option key={cat.id} value={cat.name}>{cat.name}</option>
              ))}
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
