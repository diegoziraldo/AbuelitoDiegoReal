import React, { useState } from 'react';
import axios from 'axios';

export const UpdateProduct = ({ productId }) => {
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

  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5000/products/${productId}`, formData);
      console.log('Producto actualizado:', response.data);
      // Lógica adicional después de la actualización
    } catch (error) {
      console.error('Error al actualizar el producto:', error);
    }
  };

  return (
    <>
      <form onSubmit={handleUpdate}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Nombre del producto"
        />
        {/* Aquí irían el resto de los campos de formulario */}
        <button type="submit">Actualizar Producto</button>
      </form>
    </>
  )
}

