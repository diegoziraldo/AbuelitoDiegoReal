import React, {useState, useEffect} from 'react'
import axios from 'axios';

export const AddSales = () => {

  const [sales, setSales] = useState('')

  useEffect(() => {
    const fetchSaludo = async()=>{
      try{
        const response = await axios.get('http://localhost:5000/add-sales');
        setSales(response.data || "Mensaje por defecto");
      }catch (error) {
        console.error('Error al saludo:', error);
      }
    };

    fetchSaludo();
  }, []);

  return (
    <div>
      <p>{sales}</p>
    </div>
  )
}
