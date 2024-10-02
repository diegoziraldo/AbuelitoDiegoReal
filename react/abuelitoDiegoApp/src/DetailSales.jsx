import React from 'react'
import './DetailSales.css';
import { Button } from 'react-bootstrap';
export const DetailSales = ({ SalesProduct }) => {




  return (
    <>

      <div className='col-md-4 border-end'>

        <div className="mt-4">
          <h4>Detalles de la compra:</h4>
          {
            SalesProduct.map((sale, index) => (
              <div className='product-image-details' key={index}>
                <p>ID: {sale.id}</p>
                <p>Nombre: {sale.name}</p>
                <p>Precio: {sale.price}</p>
                <p>Cantidad: {sale.quantity}</p>
                <div>
                  <img src={"http://localhost:5000" + sale.img} />
                </div>
                <Button className="btn btn-danger">Sacar del carrito</Button>
              </div>
            ))}
        </div>

      </div>

    </>
  )
}
