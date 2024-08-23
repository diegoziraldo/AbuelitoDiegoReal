import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";


export const GetClients = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/clients'); 
        setData(response.data);
    } catch (error) {
         console.error('Error fetching data:', error);
       }
     };
 
     fetchData();
   }, []);

  return (
    <div className="container table-responsive">
      <table className="table table-hover">
        <thead className="table-light">
          <caption>Table Name</caption>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Direccion</th>
            <th>Localidad</th>
            <th>Telefono</th>
            <th>Email</th>
            <th>Fecha de inscripcion</th>
            <th>Fecha de modficacion</th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {/* Replace with data from API response */}
          {data ? (
            data.map((client) => (
              <tr key={client.id}> {/* Assuming your data has an 'id' field */}
                <td>{client.name}</td>
                <td>{client.lastName}</td>
                <td>{client.address}</td>
                <td>{client.city}</td>  {/* Assuming 'city' instead of 'Localidad' */}
                <td>{client.tel}</td>
                <td>{client.email}</td>
                <td>{client.created_at}</td>  {/* Assuming these fields exist */}
                <td>{client.updated_at}</td>
              </tr>
            ))
          ) : (
            <tr className="table-primary">
              <td colSpan="8">Esperando conexion a la base de datos</td>
            </tr>
          )}
        </tbody>
        <tfoot></tfoot>
      </table>
    </div>
  );
};
