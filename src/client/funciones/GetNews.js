import axios from "axios";
import { useState } from "react";
import jwtDecode from "jwt-decode";
const Noticias = async (state)=> {
    
    const usuario = useState(JSON.parse(localStorage.getItem('Token')));
    const token = jwtDecode(usuario);
    console.log(token);
    const peticion = await axios.get(`http://localhost:5000/news/${token.id}`)
    state(peticion.data);
}
export {
    Noticias
}