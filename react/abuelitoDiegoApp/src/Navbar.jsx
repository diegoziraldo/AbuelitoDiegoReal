import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

export const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Administración de Abuelito
        </Link>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link
              className={`nav-item nav-link ${
                location.pathname === "/add-clients" ? "active" : ""
              }`}
              to="/add-clients"
            >
              Agregar Clientes
            </Link>
            <Link
              className={`nav-item nav-link ${
                location.pathname === "/get-clients" ? "active" : ""
              }`}
              to="/get-clients"
            >
              Obtener Clientes
            </Link>
            <Link
              className={`nav-item nav-link ${
                location.pathname === "/add-products" ? "active" : ""
              }`}
              to="/add-products"
            >
              Agregar Productos
            </Link>
            <Link
              className={`nav-item nav-link ${
                location.pathname === "/get-products" ? "active" : ""
              }`}
              to="/get-products"
            >
              Obtener Productos
            </Link>
            <Link
              className={`nav-item nav-link ${
                location.pathname === "/add-providers" ? "active" : ""
              }`}
              to="/add-providers"
            >
              Agregar Proveedores
            </Link>
            <Link
              className={`nav-item nav-link ${
                location.pathname === "/get-providers" ? "active" : ""
              }`}
              to="/get-providers"
            >
              Obtener Proveedores
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
