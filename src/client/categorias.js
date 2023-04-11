import React, {useState, useEffect} from "react";
import { useNavigate, useParams } from "react-router";
import Header from "./header";
import axios from "axios";
import "./css/categorias.css";

function RegistrarCategoria(){
    let [usuario, setusuario] = useState(JSON.parse(localStorage.getItem('Token')));
    useEffect(() => {
        if(!usuario){
            window.location("/")
        }
    }, []);
    let navigate=useNavigate();
    const Registrar = async (name) => {   
        if(!name){
            alert("Ingrese la categoria");
        }else{
            axios.post('http://localhost:5000/category',{
            name: name
            },{
                headers: {
                'Content-Type': 'application/json'
                }  
         }).then(function (res) {
                 console.log(res);
                 if(res){
                    alert("Categoria registrada");
                    navigate("/home");
                 }
               }).catch(error=>{
                console.log("error: "+error);
                alert("La categoria digitada ya existe");
              });
              
        };

    };
    let [name, setName] = useState('');
    return (
        <div className="background3">
              {<Header />}
            <div className="cover3">
                <h1> Registre su Categoria</h1>
                <input className="nombre" type="text" placeholder="Categoria" onChange={ev => setName(ev.target.value)} required />
                <div className="login-btn1" type="submit" value="Registrar" onClick={() => Registrar(name)}>registrar Categoria</div>
                     {/*<input type="submit" value="Registrar" onClick={() => Registrar(usuario, correo, contra, contra2)} />*/}
            </div>
        </div>
    );
}
export default RegistrarCategoria;