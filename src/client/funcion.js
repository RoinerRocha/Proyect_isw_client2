import axios from "axios";
const todasCategorias = async (state)=> {
    const peticion = await axios.get('http://localhost:5000/category')
    state(peticion.data);
}
export {
    todasCategorias
}