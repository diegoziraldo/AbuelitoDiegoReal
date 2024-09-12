import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import { Checkbox } from '@mui/material';

export const ListPriceProducts = () => {
  const [allData, setAllData] = useState({});
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  // Obtener productos y categorías
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Promise.all([
          axios.get('http://localhost:5000/products'),
          axios.get('http://localhost:5000/category')
        ]);
        
        const [products, categories] = response;
        const groupedData = {};
        products.data.forEach(product => {
          if (!groupedData[product.category]) {
            groupedData[product.category] = [];
          }
          groupedData[product.category].push(product);
        });
        setAllData(groupedData);
        setCategories(categories.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  // Manejar cambios en los checkboxes de las categorías
  const handleCheckboxChange = (event, categoryId) => {
    if (event.target.checked) {
      // Agregar la categoría seleccionada al estado
      setSelectedCategories([...selectedCategories, categoryId]);
    } else {
      // Eliminar la categoría deseleccionada del estado
      setSelectedCategories(selectedCategories.filter(id => id !== categoryId));
    }
  };

  // Filtrar productos según las categorías seleccionadas
  const filteredProducts = selectedCategories.length > 0 
    ? selectedCategories.flatMap(categoryId => allData[categoryId] || [])
    : []; // Mostrar todos los productos si no hay categorías seleccionadas

  return (
    <>
      <div>
        <label>Categorías:</label>
        {categories.map((category) => (
          <div key={category.id} className="mb-3">
            <Checkbox
              checked={selectedCategories.includes(category.id)}
              onChange={(event) => handleCheckboxChange(event, category.id)}
            />
            <label>{category.name}</label>
          </div>
        ))}
      </div>

      <div className="container table-responsive">
        <table className="table table-hover">
          <thead className="table-light">
            <tr>
              <th>Código</th>
              <th>Categoria</th>
              <th>Producto</th>
              <th>Descripción</th>
              <th>Unidad</th>
              <th>Precio</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {/* Mostrar productos filtrados */}
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <tr key={product.id}>
                  <td>{product.sku}</td>
                  <td>{product.category}</td>
                  <td>{product.name}</td>
                  <td>{product.description}</td>
                  <td>{product.unit}</td>
                  <td>${product.price}</td>
                </tr>
              ))
            ) : (
              <tr className="table-primary">
                <td colSpan="5">No hay productos para mostrar</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};
