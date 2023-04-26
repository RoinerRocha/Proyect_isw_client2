import axios from "axios";
import { useEffect, useState } from "react";
import Header from "./header";
import filter from "./filter";
import { Noticias } from "./funciones/GetNews";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router"
import "./css/home.css";

function Home() {
    let [usuario, setusuario] = useState(JSON.parse(localStorage.getItem('Token')));
    const token = jwtDecode(usuario);
    let [notice, setNotice] = useState([]);
    const [categorias, setCategorias] = useState(null)
    
    /*const [news, setNews] = useState(null)
    useEffect(() => {
        Noticias(setNews)
    }, [])*/
    const allCategorys = async (state) => {
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
                state(res.data.categories)
                console.log(state)
                
            })
    }
    useEffect(() => {
        allCategorys(setCategorias)
    }, [])


    useEffect(() => {
        fetch('http://localhost:4000', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                query: `
                    query News {
                        news (id: "${token.id}"){
                            date
                            permalink
                            short_description
                            title
                        }
                    }
                `})
        })
            .then(res => res.json())
            .then(res => {
                setNotice(res.data.news);
                console.log(setNotice);
            })

    }, []);


    useEffect(() => {
        if (!usuario) {
            window.location("/")
        }
    }, []);

    const Filtro = (props) => {
        console.log(props);
        fetch('http://localhost:4000', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                query: `
                    query NewsByCat {
                        newsByCat(id: "${token.id}", cat: "${props}") {
                        date
                        permalink
                        short_description
                        title
                        }
                    }
                `})
        })
            .then(res => res.json())
            .then(res => {
                setNotice(res.data.newsByCat);
                console.log(setNotice);
            })
    }

    return (
        <div className="Body1">
            <div className="principal">
                {<Header />}
                <div className='container-filter container'>
                    <div className='icon-filter'>
                        {categorias !== null ? (categorias.map(cat => (
                            <button onClick={(props) => Filtro(cat._id)} className="btn-cat">{cat.name}</button>
                        ))) : ('no hay cosas')}
                        <span className="span">Filtrar Categorias</span>
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
        </div>
    )
}
export default Home;