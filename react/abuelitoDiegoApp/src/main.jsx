import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import  { AddClients } from './AddClients.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AddClients />
  </StrictMode>,
)
