import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router"
import axios from "axios";
import { Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Label } from "reactstrap";
import 'bootstrap/dist/css/bootstrap.css';
import "./css/Login.css";

function Logicalogin(correo, cont, navigate) {
    let Tokuser = "";
    if (!correo || !cont) {
        if (!correo && cont) {
            alert("Llenar campos");
        } if (!cont && correo) {
            alert("Llenar campos");
        } if (!correo && !cont) {
            alert("Llenar campos");
        }

    } else {
        axios.post('http://localhost:5000/session', {
            email: correo,
            password: cont
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function (res) {
            console.log(res);
            if (!res.data.data) {
                alert("error, debes confirmar tu cuenta");
            }
            if (res.data.data) {
                Tokuser = res.data.data;
                localStorage.setItem('Token', JSON.stringify(Tokuser));
                navigate("/home");
            };

        })

    };

}

function Login() {
    useEffect(() => {
        fetch('http://localhost:4000', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                query: `
                    query {
                        categories {
                            _id
                            name
                        }
                    }
                `})
        })
            .then(res => res.json())
            .then(res => {
                console.log(res.data.categories)
                
            })
    })


    const navigate = useNavigate();

    let [correo, setCorreo] = useState('');
    let [cont, setContra] = useState('');
    let [mostrar, setMostrar] = useState(false);
    return (
        <div className="Body">
            <div className="Box">
                <span className="BorderLine"></span>
                <form>
                    <h2>Inicio</h2>
                    <div className="InputBox">
                        <input className="email" type="text" placeholder="Email" onChange={ev => setCorreo(ev.target.value)} required />
                        <i></i>
                    </div>
                    <div className="InputBox">
                        <input className="contra" type="password" placeholder="Contraseña" onChange={ev => setContra(ev.target.value)} required />
                        <i></i>
                    </div>
                    <div className="links">
                        <a href="/register">Registrarse aqui</a>
                        <a onClick={() => setMostrar(true)}>Ingresar Codigo</a>
                    </div>
                    {/*<div className="login-btn" type="submit" value="Login" onClick={() => Logicalogin(correo, cont, navigate)}>login</div>*/}
                    <div className="login-btn" type="submit" value="Login" onClick={() => setMostrar(true)}>Enviar Código</div>
                    {/*<input type="submit" value="Login" onClick={()=>Logicalogin(correo,contra,navigate)}/>*/}
                </form>
            </div>
            <div className="modal-container" style={{display: mostrar ? 'grid': 'none'}}>
                <div className="modal-cuerpo">
                    <h1>insertar codigo</h1>
                    <button className="modal-close" onClick={()=> setMostrar(false)}>Cerrar</button>
                    <input placeholder="Ingrese el codigo" />
                    <button className="modal-succes" onClick={()=> setMostrar(false)}>Ingrear Codigo</button>
                </div>
            </div>
        </div>
    );
}
export default Login;