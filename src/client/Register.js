import React, {useState, useEffect} from "react";
import { useNavigate, useParams } from "react-router"
import axios from "axios";
import "./css/Register.css";
function Register(){
    let navigate=useNavigate();
    const Registrar = async (fname, lname, phone, email, password) => {   
        if(!fname || !lname || !phone || !email || !password){
            alert("Falta algun dato por ingresar");
        }else{
            axios.post('http://localhost:5000/user',{
            fname: fname,
            lname: lname,
            phone: phone,
            email: email,
            password: password,
            role: "user"
            },{
                headers: {
                'Content-Type': 'application/json'
                }  
         }).then(function (res) {
                 if(res){
                    if (res.data.confirmed == false){
                        alert("Necesitas confirmar tu correo para acceder");
                        navigate("/");
                    }
                 }
               }).catch(error=>{
                alert("El correo digitado ya existe");
              });
              
        };

    };
    let [fname, setName] = useState('');
    let [lname, setLname] = useState('');
    let [phone, setPhone] = useState('');
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    return (
        <div className="body">
            <div className="box">
                <span className="borderLine"></span>
                <form>
                    <h2>Registro</h2>
                    <div className="inputbox">
                        <input className="name" type="text" placeholder="Nombre" onChange={ev => setName(ev.target.value)} required />
                        <i></i>
                    </div>
                    
                    <div className="inputbox">
                        <input className="LastName" type="text" placeholder="Apellido" onChange={ev => setLname(ev.target.value)} required />
                        <i></i>
                    </div>
                    <div className="inputbox">
                        <input className="phoneNumber" type="text" placeholder="telefono" onChange={ev => setPhone(ev.target.value)} required />
                        <i></i>
                    </div>
                    <div className="inputbox">
                        <input className="email" type="email" placeholder="Email" onChange={ev => setEmail(ev.target.value)} required />
                        <i></i>
                    </div>
                    <div className="inputbox">
                        <input className="password" type="password" placeholder="Contraseña"  onChange={ev => setPassword(ev.target.value)} required />
                        <i></i>
                    </div>
                    <div className="Links">    
                        <a href="/">Forgot password</a>
                        <a href="/">SingUp</a>
                    </div>
                    <div className="submit" type="submit" value="Registrar" onClick={() => Registrar(fname, lname, phone, email, password)}>registrar</div>
                </form>
                        {/*<input type="submit" value="Registrar" onClick={() => Registrar(usuario, correo, contra, contra2)} />*/}
            </div>
        </div>
    );
}
export default Register;