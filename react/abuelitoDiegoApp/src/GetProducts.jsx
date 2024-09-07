import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";


export const GetProducts = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/products'); 
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
          <caption></caption>
          <tr>
            <th>Código</th>
            <th>Producto</th>
            <th>Descripcion</th>
            <th>Categoria</th>
            <th>Stock</th>
            <th>Unidad</th>
            <th>Precio</th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {/* Replace with data from API response */}
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
