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

    const [search, setSearch] = useState('');
    console.log(search);
    const Searching = async (props) => {
        if (!search) {
            alert("No has escrito la noticia");
        } else {
            localStorage.setItem('Palabra', JSON.stringify(search));
            const palabra = localStorage.getItem('Palabra');
            console.log(palabra);
            alert("Buscando");
            fetch('http://localhost:4000', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    query: `
                            query {
                                searchNews(id: "${token.id}", keyword: "${props}") {
                                    category_id
                                    date
                                    news_sources_id
                                    permalink
                                    short_description
                                    title
                                    user_id
                                }
                            }
                        `})
            })
                .then(res => res.json())
                .then(res => {
                    setNotice(res.data.searchNews);
                    console.log(notice);
                })
        }
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
                    <div  className="form-group">
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth='1.5'
                            stroke='currentColor'
                            className='icon-search'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
                            />
                        </svg>
                        <input
                            type='text'
                            name='search'
                            id=''
                            value={search}
                            //onChange={onInputChange}
                            placeholder='Buscar noticia'
                            onChange={ev => setSearch(ev.target.value)}
                        />

                        <button type="submit" className='btn-search' onClick={(props) => Searching(search)}>Buscar</button>
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