import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router"
import axios from "axios";
import "./css/categorias.css";

function LogicalVerif(usuario, navigate) {
    
    let Tokuser = "";
    if (usuario == null) {
        alert("Insertar Codigo")

    } else {
        axios.post(`http://localhost:5000/session/${usuario}`).then(function (res) {
            if (!res.data.data) {
                alert("error");
            }
            if (res.data.data) {
                Tokuser = res.data.data;
                localStorage.setItem('Token', JSON.stringify(Tokuser));
                alert("Accediendo");
                navigate("/home");
            };
        })

    };

}

function Pasworldless() {
    const navigate = useNavigate();
    let [usuario, setUusario] = useState(JSON.parse(localStorage.getItem('Token')));
    return(
        <div className="Main">
                <div className="Container">
                    <span className="Borde"></span>
                    <form>
                        <h2> Ingresar </h2>
                        <div className="category-btn" type="submit" value="Registrar" onClick={() => LogicalVerif(usuario,navigate)}>Entrar</div>
                    </form>
                    {/*<input type="submit" value="Registrar" onClick={() => Registrar(usuario, correo, contra, contra2)} />*/}
                </div>
            </div>
    );
}
export default Pasworldless;