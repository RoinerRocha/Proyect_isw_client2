import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import Header from "./header";
import axios from "axios";
import "./css/categorias.css";

function RegistrarCategoria() {
    let [usuario, setusuario] = useState(JSON.parse(localStorage.getItem('Token')));
    useEffect(() => {
        if (!usuario) {
            window.location("/")
        }
    }, []);
    let navigate = useNavigate();
    const Registrar = async (name) => {
        if (!name) {
            alert("Ingrese la categoria");
        } else {
            axios.post('http://localhost:5000/category', {
                name: name
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function (res) {
                console.log(res);
                if (res) {
                    alert("Categoria registrada");
                    navigate("/home");
                }
            }).catch(error => {
                console.log("error: " + error);
                alert("La categoria digitada ya existe");
            });

        };

    };
    let [name, setName] = useState('');
    return (
            <div className="Main">
                <div className="Container">
                    <span className="Borde"></span>
                    <form>
                        <h2> Registre su Categoria</h2>
                        <div className="inputsbox">
                            <input className="nombre" type="text" placeholder="Categoria" onChange={ev => setName(ev.target.value)} required />
                            <i></i>
                        </div>
                        <div className="Links">
                            <a href="/tableCategories">Regresar</a>
                        </div>
                        <div className="category-btn" type="submit" value="Registrar" onClick={() => Registrar(name)}>registrar Categoria</div>
                    </form>
                    {/*<input type="submit" value="Registrar" onClick={() => Registrar(usuario, correo, contra, contra2)} />*/}
                </div>
            </div>
    );
}
export default RegistrarCategoria;