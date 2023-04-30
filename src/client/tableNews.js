import axios from "axios";
import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router"
import "./css/table.css";
import jwtDecode from "jwt-decode";
import Header from "./header";
import { Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter } from "reactstrap";



function TableNews() {
    let [usuario, setusuario] = useState(JSON.parse(localStorage.getItem('Token')));
    const token = jwtDecode(usuario);

    useEffect(() => {
        if (!usuario) {
            window.location("/")
        }
    }, []);

    const [sources, setSources] = useState(null)

    const [categorias, setCategorias] = useState(null)
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
    const [editData, setEditData] = useState(null)
    const [formData, setFormData] = useState({
        name: '',
        url: ''
    })

    useEffect(() => {
        fetch('http://localhost:4000', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                query: `
                    query NewSourceById {
                        newSourceById(id: "${token.id}") {
                            _id
                            category_id
                            name
                            url
                            user_id
                        }
                    }
                `})
        })
            .then(res => res.json())
            .then(res => {
                setSources(res.data.newSourceById)
                console.log(setSources)

            })
    }, []);

    useEffect(() => {
        if (editData !== null) {
            setFormData(editData)
        } else {
            setFormData({
                name: '',
                url: ''
            })
        }
    }, [editData])

    const editSource = (sources) => {
        console.log(sources._id);
        const isEdited = window.confirm(`Desea Editar esta categoria?${sources._id}`)
        if (isEdited) {
            axios.put(`http://localhost:5000/newsource/${sources._id}`, {
                _id: sources._id,
                url: formData.url,
                name: formData.name,

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
                editSource(formData)
            } else {
                formData._id = Date.now()
                setFormData({
                    name: '',
                    url: ''
                })
            }
        } else {
            alert("Por favor agrega un equipo y pais.")
        }
    }

    const deleteSource = _id => {
        const isDelete = window.confirm(`Desea eliminar este Source?${_id}`)
        if (isDelete) {
            axios.delete(`http://localhost:5000/newsource/${_id}`, {
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


    function LogicaNew(navigate) {
        navigate("/newSources");

    }
    let [idC, setIdC] = useState('');
    const navigate = useNavigate();
    return (
        <div className="tabla">
            {<Header />}
            <Container className="tablita">
                <br />
                <Button onClick={() => LogicaNew(navigate)} color="success">Insertar nueva fuente</Button>
                <br /><br />
                <Table>
                    <thead>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Acciones</th>
                    </thead>
                    <tbody>
                        {sources !== null ? (sources.map(sou => (
                            categorias !== null ? (categorias.map(cat => {
                                if (sou.category_id === cat._id) {
                                    return (
                                        <tr>
                                            <td>{sou.name}</td>
                                            <td >{cat.name}</td>
                                            <td>
                                                <Button onClick={() => setEditData(sou)} color="primary">editar</Button>{"  "}
                                                <Button onClick={() => deleteSource(sou._id)} color="danger">eliminar</Button>
                                            </td>
                                        </tr>
                                    )
                                }
                            })) : ('no hay fuentes')
                        ))) : ('no hay fuentes')}
                    </tbody>
                </Table>
                <form className='m-3' onSubmit={handleSubmit} >
                    <label htmlFor="name">Titulo de la fuente que desea editar aqui:</label>
                    <input type="text" name="name" onChange={handleChange} value={formData.name}></input>
                    <label htmlFor="name">Fuente de la categoria que desea cambiar:</label>
                    <input type="text" name="url" onChange={handleChange} value={formData.url}></input>
                    <input className='btn btn-success mx-1' type="submit" value="Enviar" />
                    <input className='btn btn-danger mx-1' type="reset" value="Cancelar" />
                </form>
            </Container>
        </div>
    )
}
export default TableNews;