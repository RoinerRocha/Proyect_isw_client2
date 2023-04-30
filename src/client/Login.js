import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router"
import axios from "axios";
import { Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Label, Alert } from "reactstrap";
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
        axios.post('http://localhost:5000/2FA', {
            email: correo,
            password: cont
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function (res) {
            console.log(res);
            if (res.data.error) {
                alert("error, al enviar el codigo");
            }
            if (!res.data.error) {
                alert("Codigo Enviado")
                //Tokuser = res.data.data;
                //localStorage.setItem('Token', JSON.stringify(Tokuser));
                //navigate("/home");
            };

        })

    };

}


function LogicalCode(codigo, navigate) {
    let Tokuser = "";
    if (!codigo) {
        alert("Insertar Codigo")

    } else {
        axios.post(`http://localhost:5000/session2fa/${codigo}`).then(function (res) {
            console.log(res.data.data);
            if (!res.data.data) {
                alert("error");
            }
            if (res.data.data) {
                Tokuser = res.data.data;
                localStorage.setItem('Token', JSON.stringify(Tokuser));
                alert("Codigo Enviado");
                navigate("/home");
            }
        })

    };

}

function LogicalPaswordless(correo) {
    let Tokuser = "";
    if (!correo) {
        alert("Primero digita tu correo")

    } else {
        axios.post("http://localhost:5000/passwordless", {  
            email: correo,    
        },{
            headers: {
            'Content-Type': 'application/json'
             }  
        }).then(function (res) {
            console.log(res);
            if (!res.data.data) {
                alert("nop");
            }
            if (res.data.data) {
                Tokuser = res.data.data;
                localStorage.setItem('Token', JSON.stringify(Tokuser));
                alert("Email Enviado");
            }
        })

    };

}

function Login() {

    const navigate = useNavigate();

    let [correo, setCorreo] = useState('');
    let [cont, setContra] = useState('');
    let [mostrar, setMostrar] = useState(false);
    let [codigo, setCodigo] = useState('');
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
                    <div className="login-btn" type="submit" value="Login" onClick={() => Logicalogin(correo, cont, navigate)}>Enviar Código</div>
                    <div className="login-btn" type="submit" value="Login" onClick={() => LogicalPaswordless(correo)}>Pasworldless</div>
                    {/*<div className="login-btn" type="submit" value="Login" onClick={() => setMostrar(true)}>Enviar Código</div>*/}
                    {/*<input type="submit" value="Login" onClick={()=>Logicalogin(correo,contra,navigate)}/>*/}
                </form>
            </div>
            <div className="modal-container" style={{ display: mostrar ? 'grid' : 'none' }}>
                <div className="modal-cuerpo">
                    <h1>insertar codigo</h1>
                    <button className="modal-close" onClick={() => setMostrar(false)}>Cerrar</button>
                    <input placeholder="Ingrese el codigo" onChange={ev => setCodigo(ev.target.value)} required />
                    <button className="modal-succes" onClick={() => LogicalCode(codigo, navigate)}>Ingrear Codigo</button>
                </div>
            </div>
        </div>
    );
}
export default Login;