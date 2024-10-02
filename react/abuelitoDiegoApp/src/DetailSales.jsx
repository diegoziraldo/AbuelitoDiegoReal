import React from 'react'
import './DetailSales.css';
export const DetailSales = ({ SalesProduct }) => {
  return (
    <>

      <div className='col-md-4 border-end'>

        <div className="mt-4">
          <h4>Detalles de la compra:</h4>
          {
            SalesProduct.map((sale, index) => (
              <div key={index}>
                <p>ID: {sale.id}</p>
                <p>Nombre: {sale.name}</p>
                <p>Precio: {sale.price}</p>
                <p>Cantidad: {sale.quantity}</p>
                <img className="img-fluid" src={"http://localhost:5000" + sale.img} />
              </div>
            ))}
        </div>

      </div>

    </>
  )
}
