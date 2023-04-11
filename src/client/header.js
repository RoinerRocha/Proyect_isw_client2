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
                <form >
					<div className='form-group'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth='1.5'
							stroke='currentColor'
							className='icon-search'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
							/>
						</svg>
						<input
							type='search'
							name='valueSearch'
							id=''
							//value={valueSearch}
							//onChange={onInputChange}
							placeholder='Buscar noticia'
						/>
					</div>

					<button className='btn-search'>Buscar</button>
				</form>
            </div>
        </header>

    );
}

export default Header;