import { useContext } from 'react';
import './App.css';
import Login from './Component/Login/Login';
import Logintwo from './Component/Login/Logintwo';
import { Routes, Route, Navigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { userContext } from './utils/userContext';

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Logintwo />} />
      </Routes>
    </>
  );


}

export default App;
