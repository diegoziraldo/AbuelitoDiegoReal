import React from 'react';
import './DetailSales.css';
import { Button } from 'react-bootstrap';

export const DetailSales = ({ SalesProduct }) => {
  return (
    <>
      <div className='col-md-4 border-end '>
        <div className="mt-4 ">
          <h4>Detalles de la compra:</h4>
          {
            SalesProduct.length > 0 ? (
              SalesProduct.map((sale, index) => (
                <div className='container-fluid product-details-container' key={index}> {/* `key` debe ir aquí */}
                  <div className='row align-items-center  '>
                    <div className='col-md-6'>
                      <div className="product-details ">
                        <p>ID: {sale.id}</p>
                        <p>Nombre: {sale.name}</p>
                        <p>Precio: {sale.price}</p>
                        <p>Cantidad: {sale.quantity}</p>
                      <Button className="btn btn-danger">Sacar del carrito</Button>
                      </div>
                    </div>


                    <div className='col-md-6'>
                      <div className="product-image text-end">
                        <img src={"http://localhost:5000" + sale.img} alt={sale.name} />
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No hay productos en el carrito.</p>
            )
          }
        </div>
      </div>
    </>
  );
}
