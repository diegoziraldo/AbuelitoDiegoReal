import React, { useState } from 'react';
import axios from 'axios';

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


    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Nombre:</label>
        <input
          type="text"
          id="name"
          name='name'
          value={formData.name}
          onChange={handleChange}
        />
        <label htmlFor="name">Descripcion:</label>
        <input
          type="text"
          id="description"
          name='description'
          value={formData.description}
          onChange={handleChange}
        />
        <label htmlFor="name">Categoria:</label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="">Selecciona una categoría</option>
          <option value="Limpieza">Limpieza</option>
          <option value="Detergentes">Detergentes</option>
          <option value="Aromatizacion">Aromatizacion</option>
          <option value="Bolsas">Bolsas</option>
        </select>
        <label htmlFor="name">Precio:</label>
        <input
          type="number"
          id="price"
          name='price'
          value={formData.price}
          onChange={handleChange}
        />
        <label htmlFor="name">Stock:</label>
        <input
          type="number"
          id="stock"
          name='stock'
          value={formData.stock}
          onChange={handleChange}
        />
        <label htmlFor="name">Código</label>
        <input
          type="text"
          id="sku"
          name='sku'
          value={formData.sku}
          onChange={handleChange}
        />
        <label htmlFor="name">Imagen:</label>
        <input
          type="file"
          id="image_url"
          name='image_url'
          value={formData.image_url}
          onChange={handleChange}
        />
        <label htmlFor="name">Marca:</label>
        <input
          type="text"
          id="brand"
          name='brand'
          value={formData.brand}
          onChange={handleChange}
        />
        <label htmlFor="name">Unidad:</label>
        <select
          type="text"
          id="unit"
          name='unit'
          value={formData.unit}
          onChange={handleChange}
        >
          <option value="">Selecciona una categoría</option>
          <option value="Kilo">Kilo</option>
          <option value="Litro">Litro</option>
          <option value="Metro">Metros</option>
        </select>
        <button type="submit">Agregar Producto</button>
      </form>
    </div>
    </>
  );
}
