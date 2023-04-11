
import './App.css';
import Login from './client/Login';
import Register from './client/Register';
import Home from './client/home';
import News from './client/newsSources';
import Categorias from './client/categorias';
import Table from './client/tableNews';
import TableCategories from './client/tableCategories';
import {
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <div className="App"> 
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/newSources' element={<News/>}/>
          <Route path='/categorias' element={<Categorias/>}/>
          <Route path='/tableNews' element={<Table/>}/>
          <Route path='/tableCategories' element={<TableCategories/>}/>
        </Routes>   
    </div>
  ); 
}

export default App;
