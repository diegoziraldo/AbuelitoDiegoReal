import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

export const Navbar = () => {
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState(null);

  const toggleMenu = (menu) => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  const closeAllMenus = () => setActiveMenu(null);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/" onClick={() => toggleMenu(null)}>
          Administración de Abuelito
        </Link>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">

            {/*############################ Boton Desplegable Clientes ####################################################################  */}
            <div className="nav-item dropdown">
              <button className="nav-link btn" onClick={() => toggleMenu("clients")}>
                Clientes
              </button>
              {activeMenu === "clients" && (
                <div className="dropdown-menu show">
                  <Link
                    className={`dropdown-item ${location.pathname === "/add-clients" ? "active" : ""
                      }`}
                    to="/add-clients"
                    onClick={closeAllMenus}
                  >
                    Agregar Clientes
                  </Link>
                  <Link
                    className={`dropdown-item ${location.pathname === "/get-clients" ? "active" : ""
                      }`}
                    to="/get-clients"
                    onClick={closeAllMenus}
                  >
                    Obtener Clientes
                  </Link>
                </div>
              )}
            </div>

            {/*########################### Boton Desplegable Productos ####################################################################  */}
            <div className="nav-item dropdown">
              <button
                className="nav-link btn"
                onClick={() => toggleMenu("products")}
              >
                Productos
              </button>
              {activeMenu === "products" && (
                <div className="dropdown-menu show">
                  <Link
                    className={`dropdown-item ${location.pathname === "/add-products" ? "active" : ""
                      }`}
                    to="/add-products"
                    onClick={closeAllMenus}
                  >
                    Agregar Productos
                  </Link>
                  <Link
                    className={`dropdown-item ${location.pathname === "/get-products" ? "active" : ""
                      }`}
                    to="/get-products"
                    onClick={closeAllMenus}
                  >
                    Obtener Productos
                  </Link>
                  <Link
                    className={`dropdown-item ${location.pathname === "/get-list-products" ? "active" : ""
                      }`}
                    to="/get-list-products"
                    onClick={closeAllMenus}
                  >
                    Lista de precios
                  </Link>
                </div>
              )}
            </div>

            {/*############################ Boton Desplegable Proveedores ####################################################################  */}
            <div className="nav-item dropdown">
              <button
                className="nav-link btn"
                onClick={() => toggleMenu("providers")}
              >
                Proveedores
              </button>
              {activeMenu === "providers" && (
                <div className="dropdown-menu show">
                  <Link
                    className={`dropdown-item ${location.pathname === "/add-providers" ? "active" : ""
                      }`}
                    to="/add-providers"
                    onClick={closeAllMenus}
                  >
                    Agregar Proveedores
                  </Link>
                  <Link
                    className={`dropdown-item ${location.pathname === "/get-providers" ? "active" : ""
                      }`}
                    to="/get-providers"
                    onClick={closeAllMenus}
                  >
                    Obtener Proveedores
                  </Link>
                </div>
              )}
            </div>

            {/*############################ Boton Desplegable Repartidores ####################################################################  */}

            <div className="nav-item dropdown">
              <button
                className="nav-link btn"
                onClick={() => toggleMenu("leaders")}
              >
                Repartidores
              </button>
              {activeMenu === "leaders" && (
                <div className="dropdown-menu show">
                  <Link
                    className={`dropdown-item ${location.pathname === "/add-leaders" ? "active" : ""
                      }`}
                    to="/add-leaders"
                    onClick={closeAllMenus}
                  >
                    Agregar Repartidores
                  </Link>
                  <Link
                    className={`dropdown-item ${location.pathname === "/get-leaders" ? "active" : ""
                      }`}
                    to="/get-leaders"
                    onClick={closeAllMenus}
                  >
                    Obtener Repartidores
                  </Link>
                </div>
              )}
            </div>

            {/*############################ Boton Desplegable Ventas ####################################################################  */}

            <div className="nav-item dropdown">
              <button
                className="nav-link btn"
                onClick={() => toggleMenu("sales")}
              >
                Ventas
              </button>
              {activeMenu === "sales" && (
                <div className="dropdown-menu show">
                  <Link
                    className={`dropdown-item ${location.pathname === "/add-sales" ? "active" : ""
                      }`}
                    to="/add-sales"
                    onClick={closeAllMenus}
                  >
                    Agregar Venta
                  </Link>
                  <Link
                    className={`dropdown-item ${location.pathname === "/get-sales" ? "active" : ""
                      }`}
                    to="/get-sales"
                    onClick={closeAllMenus}
                  >
                    Obtener Ventas
                  </Link>
                </div>
              )}
            </div>

            {/*############################ Boton Desplegable Pagos ####################################################################  */}

            <div className="nav-item dropdown">
              <button
                className="nav-link btn"
                onClick={() => toggleMenu("payments")}
              >
                Pagos
              </button>
              {activeMenu === "payments" && (
                <div className="dropdown-menu show">
                  <Link
                    className={`dropdown-item ${location.pathname === "/add-payments" ? "active" : ""
                      }`}
                    to="/add-payments"
                    onClick={closeAllMenus}
                  >
                    Agregar Pago
                  </Link>
                  <Link
                    className={`dropdown-item ${location.pathname === "/get-payments" ? "active" : ""
                      }`}
                    to="/get-sales"
                    onClick={closeAllMenus}
                  >
                    Obtener Pagos
                  </Link>
                </div>
              )}
            </div>


          </div>
        </div>
      </div>
    </nav>
  );
};
