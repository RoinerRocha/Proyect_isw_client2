import axios from "axios";
import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router"
import "./css/table.css";
import jwtDecode from "jwt-decode";
import { todasCategorias } from "./funcion";
import Header from "./header";
import { Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter } from "reactstrap";

function TableCategories() {
    let [usuario, setusuario] = useState(JSON.parse(localStorage.getItem('Token')));
    useEffect(() => {
        const token = jwtDecode(usuario);
        console.log(token);
        if(!usuario){
            window.location("/")
        }
        if(token.role == "user"){   
            window.location("/home")
        }
    }, []);
    const [editData, setEditData] = useState(null)
    const [formData, setFormData] = useState({
        name: '',
    })
    useEffect(() => {
        if (editData !== null) {
            setFormData(editData)
        } else {
            setFormData({
                name: '',
            })
        }
    }, [editData])
    
    const editCategory = (categorias) => {
        console.log(categorias._id);
        const isEdited = window.confirm(`Desea Editar esta categoria?${categorias._id}`)
        if (isEdited) {
            axios.put(`http://localhost:5000/category/${categorias._id}`, {
                _id: categorias._id,
                name: formData.name
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function (res) {
                console.log(res);
                if (res) {
                    navigate("/home");
                }
            }).catch(error => {
                console.log("error: " + error);
                alert("NO se pudo Editar");
            });
        }
    }

    const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value
        })
      }
    

    const handleSubmit = (e) => {
        e.preventDefault(); // Evitar que se recarge la página
        
        if (formData.name !== '') {
          if (editData !== null) {
            editCategory(formData)
          } else { 
            formData._id = Date.now()
            setFormData({
              name: '',
            })
          }
        } else {
          alert("Por favor agrega la categoria.")
        }
      }

    const [categorias, setCategorias] = useState(null)
    useEffect(() => {
        todasCategorias(setCategorias)
    }, [])

    function LogicaCat(navigate) {
        navigate("/categorias");

    }
    const deleteCategory = _id => {
        const isDelete = window.confirm(`Desea eliminar esta categoria?${_id}`)
        if (isDelete) {
            axios.delete(`http://localhost:5000/category/${_id}`, {
                _id: _id
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function (res) {
                console.log(res);
                if (res) {
                    navigate("/home");
                }
            }).catch(error => {
                console.log("error: " + error);
                alert("NO se pudo eliminar");
            });
        }
    }

    const navigate = useNavigate();
    return (
        <div className="tabla">
            {<Header />}
            <Container className="tablita">
                <br />
                <Button onClick={() => LogicaCat(navigate)} color="success">Insertar nueva categoria</Button>
                <br /><br />
                <Table>
                    <thead>
                        <th>Category</th>
                        <th>Acciones</th>
                    </thead>
                    <tbody>
                        {categorias !== null ? (categorias.map(cat => (
                            <tr>
                                <td>{cat.name}</td>
                                <td>
                                    <Button onClick={() => setEditData(cat)} color="primary">editar</Button>{"  "}
                                    <Button onClick={() => deleteCategory(cat._id)} color="danger">eliminar</Button>
                                </td>
                            </tr>
                        ))) : ('no hay categorias')}
                    </tbody>
                </Table>
                <form className='m-3'onSubmit={handleSubmit} >
                    <label htmlFor="name">Nombre Categoria a editar:</label>
                    <input type="text" name="name" onChange={handleChange} value={formData.name}></input>
                    <input className='btn btn-success mx-1' type="submit" value="Enviar" />
                    <input className='btn btn-danger mx-1' type="reset" value="Cancelar" />
                </form>
            </Container>
        </div>
    )
}
export default TableCategories;