import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import { ModalDelete } from './ModalDelete';
import { ModalModify } from './ModalModify';

// Estilos para el modal


export const GetProducts = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/products');
        setData(response.data);  // Asegúrate de que se asigna correctamente
        console.log(response.data);
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
          <tr>
            <th>Código</th>
            <th>Producto</th>
            <th>Descripción</th>
            <th>Categoría</th>
            <th>Stock</th>
            <th>Unidad</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
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
                <td>
                  <ModalModify product={product} data={data} setData={setData}/>
                  <ModalDelete product={product} data={data} setData={setData} />
                </td>
              </tr>
            ))
          ) : (
            <tr className="table-primary">
              <td colSpan="8">Esperando conexión a la base de datos</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
