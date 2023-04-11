import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { todasCategorias } from "./funcion";
import jwtDecode from "jwt-decode";
import Header from "./header";
import axios from "axios";
import "./css/newsSources.css";

function NewSources() {
    let [usuario, setusuario] = useState(JSON.parse(localStorage.getItem('Token')));
    useEffect(() => {
        if(!usuario){
            window.location("/")
        }
    }, []);
    const [categorias, setCategorias] = useState(null)
    useEffect(() => {
        todasCategorias(setCategorias)
    }, [])
    let navigate = useNavigate();

    const Registrar = async (name, url, idC) => {
        if (!name || !url) {
            alert("Falta algun dato por ingresar");
        } else {
            const token = jwtDecode(usuario);
            console.log(token.id);
            console.log(categorias);
            console.log(name,url,idC);
            let catId;
            categorias.forEach(cat => {
                if(cat.name == idC )
                {   
                    catId = cat._id;
                    console.log(catId);
                }
            });
            axios.post('http://localhost:5000/newsource', {
                url: url,
                name: name,
                user_id: token.id,
                category_id: catId
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function (res) {
                console.log(res);
                if (res) {
                    alert("Source Agregado");
                    axios.post(`http://localhost:5000/newsource/${token.id}/process`)
                    console.log("esto esssss",token.id);
                }
            }).catch(error => {
                console.log("error: " + error);
                alert("No se pudo hacer una noticia");
            });

        };

    };
    let [category, setCategory] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/category', {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function (res) {
            setCategory(res.data.data);

        }).catch(error => {
            console.log("error: " + error);
        });
    }, []);
    let [name, setName] = useState('');
    let [url, setUrl] = useState('');
    let [idC, setIdC] = useState('');
    return (
        <div className="backgroundNews">
            {<Header />}
            <div className="cover2">
                <h1>Agregar Fuentes</h1>
                <input className="nombre" type="text" placeholder="Nombre de la Fuente" onChange={ev => setName(ev.target.value)} required />
                <input className="contraseña" type="text" placeholder="URL" onChange={ev => setUrl(ev.target.value)} required />  
                <select className="categoria"onChange={ev => setIdC(ev.target.value)}>
                {categorias !== null ? (categorias.map(cat=>(
                    <option key={cat._id}>{cat.name}</option>
                ))) : ('no hay cosas')}
                    
                </select>
                <div className="login-btn1" type="submit" value="Registrar Noticia" onClick={() => Registrar(name, url, idC)}>registrar Fuente</div>
                {/*<input type="submit" value="Registrar" onClick={() => Registrar(usuario, correo, contra, contra2)} />*/}
            </div>
        </div>
    );
}
export default NewSources;