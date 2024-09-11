import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";


export const ListPriceProducts = () => {
  const [data, setData] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [dataArray, setDataArray] = useState([]); 

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/products');
        console.log('Datos obtenidos de la API:', response.data);

        // Asegurarse de que los datos sean un array antes de actualizarlos
        if (Array.isArray(response.data)) {
          setDataArray(response.data); // Actualiza el array con los datos de la API
          console.log(response.data);
          
        } else {
          console.error('La respuesta no es un array');
        }
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    fetchData();
  }, []);


  const categories = dataArray.map(cat => cat.category);

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;

    // Si está seleccionado, agregarlo al estado, de lo contrario eliminarlo
    if (checked) {
      setSelectedCategories([...selectedCategories, value]);
    } else {
      setSelectedCategories(selectedCategories.filter((category) => category !== value));
    }
  };

  return (
    <>
    <div>
      <label>Categorias:</label>
      {categories.map((category, index) => (
        <div key={index}>
          <input
            type="checkbox"
            id={`category-${index}`}
            name="categories"
            value={category.toLowerCase()}
            checked={selectedCategories.includes(category.toLowerCase())}
            onChange={handleCheckboxChange}
          />
          <label htmlFor={`category-${index}`}>{category}</label>
        </div>
      ))}
    </div>

      <div className="container table-responsive">
        <table className="table table-hover">
          <thead className="table-light">
            <caption></caption>
            <tr>
              <th>Código</th>
              <th>Producto</th>
              <th>Descripcion</th>
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
    </>
  );
};
