import axios from "axios";
import { useEffect, useState } from "react";
import Header from "./header";
import filter from "./filter";
import { todasCategorias } from "./funcion";
import { Noticias } from "./funciones/GetNews";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router"
import "./css/home.css";

function Home() {
    let [usuario, setusuario] = useState(JSON.parse(localStorage.getItem('Token')));
    const token = jwtDecode(usuario);
    let [notice, setNotice] = useState([]);
    const [categorias, setCategorias] = useState(null)
    useEffect(() => {
        todasCategorias(setCategorias)
    }, [])

    /*const [news, setNews] = useState(null)
    useEffect(() => {
        Noticias(setNews)
    }, [])*/


    useEffect(() => {
        axios.get(`http://localhost:5000/news/${token.id}`, {
            headers: {
                'Authorization': 'Bearer ' + usuario,
                'Content-Type': 'application/json'
            }
        }).then(function (res) {
            setNotice(res.data);

        }).catch(error => {
            console.log("error: " + error);
        });
    }, []);


    useEffect(() => {
        if (!usuario) {
            window.location("/")
        }
    }, []);

    const Filtro = (props) => {
        console.log(props);
        axios.get(`http://localhost:5000/news/${token.id}/${props}`, {
            headers: {
                'Authorization': 'Bearer ' + usuario,
                'Content-Type': 'application/json'
            }
        }).then(function (res) {
            console.log(res.data)
            setNotice(res.data);

        }).catch(error => {
            console.log("error: " + error);
        });
    }

    return (
        <div>
            {<Header />}
            <div className='container-filter container'>
                <div className='icon-filter'>
                    {categorias !== null ? (categorias.map(cat => (
                        <button onClick={(props) => Filtro(cat._id)} className="btn-cat">{cat.name}</button>
                    ))) : ('no hay cosas')}
                    <span>Filtrar Categorias</span>
                </div>
            </div>
            <div className="home">
                {notice !== null ? (notice.map(notices => (
                    <div className="card" key={notices.id}>
                        <p>{notices.date}</p>
                        <div>
                            <h5>{notices.title}</h5>
                            <img src="https://c1.wallpaperflare.com/preview/21/93/67/news-yellow-newspaper-3d.jpg" alt="150" width="150" />
                            <p>{notices.short_description}</p>
                            <a href={notices.permalink}>Ver Ahora</a>
                        </div>
                    </div>
                ))) : ('sin registros')}

            </div>
        </div>
    )
}
export default Home;