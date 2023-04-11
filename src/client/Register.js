import React, {useState, useEffect} from "react";
import { useNavigate, useParams } from "react-router"
import axios from "axios";
import "./css/Register.css";
function Register(){
    let navigate=useNavigate();
    const Registrar = async (fname, lname, email, password) => {   
        if(!fname || !lname || !email || !password){
            alert("Falta algun dato por ingresar");
        }else{
            axios.post('http://localhost:5000/user',{
            fname: fname,
            lname: lname,
            email: email,
            password: password,
            role: "user"
            },{
                headers: {
                'Content-Type': 'application/json'
                }  
         }).then(function (res) {
                 console.log(res);
                 if(res){
                    navigate("/");
                 }
               }).catch(error=>{
                console.log("error: "+error);
                alert("El correo digitado ya existe");
              });
              
        };

    };
    let [fname, setName] = useState('');
    let [lname, setLname] = useState('');
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    return (
        <div className="background">
            <div className="cover1">
                <h1>Registro</h1>
                <input className="nombre" type="text" placeholder="Nombre" onChange={ev => setName(ev.target.value)} required />
                <input className="correo" type="text" placeholder="Apellido" onChange={ev => setLname(ev.target.value)} required />
                <input className="contraseña" type="email" placeholder="Email" onChange={ev => setEmail(ev.target.value)} required />
                <input className="contraseña2" type="password" placeholder="Contraseña"  onChange={ev => setPassword(ev.target.value)} required />
                <div className="login-btn1" type="submit" value="Registrar" onClick={() => Registrar(fname, lname, email, password)}>registrar</div>
                <div className="alt-login1">
                    <div className="">Si ya estas registrado <a href="/">Login</a></div>
                </div>
                     {/*<input type="submit" value="Registrar" onClick={() => Registrar(usuario, correo, contra, contra2)} />*/}
            </div>
        </div>
    );
}
export default Register;