import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './Navbar';

import { AddClients } from './AddClients'
import { GetClients } from './GetClients'

import { AddProducts } from './AddProducts'
import { ListPriceProducts } from './ListPriceProducts'
import { GetProducts } from './GetProducts'

import { AddProviders } from './AddProviders'
import { GetProviders } from './GetProviders'

import { AddSales } from './AddSales';
import { GetSales } from './GetSales';



import { Index } from './Index';

export const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/add-clients" element={<AddClients />} />
        <Route path="/get-clients" element={<GetClients />} />
        <Route path="/add-products" element={<AddProducts />} />
        <Route path="/get-products" element={<GetProducts />} />
        <Route path="/get-list-products" element={<ListPriceProducts />} />
        <Route path="/add-providers" element={<AddProviders />} />
        <Route path="/get-providers" element={<GetProviders />} />
        <Route path="/add-sales" element={<AddSales />} />
        <Route path="/get-sales" element={<GetSales />} />
      </Routes>
    </Router>
  );
}
