import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import "./css/header.css";

function Header(props) {
    const cerrar = () => {
        localStorage.clear();
    }
    return (
        <header className="container">
            <div className="nav">
				<NavLink to="/tableNews" className="nav-menu-item"><a className="nav-menu-link nav-link">Nuevas Fuentes</a></NavLink>
				<NavLink to="/home" className="nav-menu-item"><a className="nav-menu-link nav-link">Home</a></NavLink>
                <NavLink to="/tableCategories"className="nav-menu-item"><a className="nav-menu-link nav-link" href="#">categorias</a></NavLink>
                <NavLink to="/" className="nav-menu-item"><a onClick={() => cerrar()} className="nav-menu-link nav-link">Logout</a></NavLink>
            </div>
        </header>

    );
}

export default Header;