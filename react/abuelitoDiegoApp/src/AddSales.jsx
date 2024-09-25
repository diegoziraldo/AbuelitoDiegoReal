import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import './AddSales.css';

export const AddSales = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Función para manejar los cambios en el input de búsqueda
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  // useEffect para ejecutar la búsqueda cuando cambia el término
  useEffect(() => {
    const fetchProducts = async () => {
      if (searchTerm.trim() !== '') {
        try {
          const response = await axios.get('http://localhost:5000/products', {
            params: { query: searchTerm }
          });
          setFilteredProducts(response.data);
        } catch (error) {
          console.error('Error al buscar productos:', error);
          setFilteredProducts([]);
        }
      } else {
        setFilteredProducts([]);
      }
    };

    fetchProducts();
  }, [searchTerm]);

  // Función para manejar el click en un producto
  const handleProductClick = (productId) => {
    const foundProduct = filteredProducts.find(p => p.id === productId);
    if (foundProduct) {
      setSelectedProduct(foundProduct);
    }
  };

  // Función para filtrar los productos según el término de búsqueda
  const filterProducts = (products, term) => {
    return products.filter(product =>
      typeof product.name === 'string' && product.name.toLowerCase().startsWith(term.toLowerCase())
    );
  };

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-8 border-end'>
          <div>
            <input
              type="search"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="form-control mb-3"
            />

            <div className="mt-4">
              {filteredProducts.length > 0 ? (
                <ul className="list-group">
                  {filterProducts(filteredProducts, searchTerm).map((product) => (
                    <li
                      key={product.id}
                      className="list-group-item cursor-pointer"
                      onClick={() => handleProductClick(product.id)}
                    >

                      <div className="product-details-container">
                        <div className="product-details">
                          <p>ID: {product.id}</p>
                          <p>Nombre: {product.name}</p>
                          <p>Precio: ${product.price}</p>
                          <Button>Comprar</Button>
                        </div>

                        <div className="product-image">
                          <img
                            // src={selectedProduct.image}
                            // alt={selectedProduct.name}
                            src={"../public/img/moon-8653540_1920.jpg"}
                            className="img-fluid"
                          />
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No hay productos que coincidan con la búsqueda.</p>
              )}
            </div>
          </div>

        </div>
        <div className='col-md-4 border-end'>
          {selectedProduct && (
            <div className="mt-4">
              <h4>Detalles de la compra:</h4>

            </div>
          )}
        </div>
      </div>
    </div>

  );
};
