import React, { useState } from 'react';
import axios from 'axios'; 

export const AddClients = () => {
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    address: '',
    city: '',
    tel: '',
    email: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Aquí realizarías la lógica para enviar los datos del cliente, por ejemplo:
    console.log(`Cliente a agregar: ` + formData.name);

  setFormData({
    name: '',
    lastName: '',
    address: '',
    city: '',
    tel: '',
    email: '',
  });


try {
  const response = await axios.post('http://localhost:5000/clients', formData); 
  console.log('Cliente agregado:', response.data);
  // Handle successful response (e.g., clear form, show success message)
  setFormData({
    name: '',
    lastName: '',
    address: '',
    city: '',
    tel: '',
    email: '',
  });
} catch (error) {
  console.error('Error al agregar el cliente:', error);

}
}

  return (
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
        <label htmlFor="lastName">Apellido:</label>
        <input
          type="text"
          id="lastName"
          name='lastName'
          value={formData.lastName}
          onChange={handleChange}
        />
        <label htmlFor="address">Direccion:</label>
        <input
          type="text"
          id="address"
          name='address'
          value={formData.address}
          onChange={handleChange}
        />
        <label htmlFor="city">Localidad:</label>
        <input
          type="text"
          id="city"
          name='city'
          value={formData.city}
          onChange={handleChange}
        />
        <label htmlFor="tel">Telefono:</label>
        <input
          type="number"
          id="tel"
          name='tel'
          value={formData.tel}
          onChange={handleChange}
        />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name='email'
          value={formData.email}
          onChange={handleChange}
        />
        <button type="submit">Agregar cliente</button>
      </form>
    </div>
  );
}
