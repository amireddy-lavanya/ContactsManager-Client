import React from 'react';
import './index.css';
import { Provider } from './components/axios/axioscontext';
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import { Navigate } from 'react-router-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ContactPage from './components/ContactPages';
function App() {
  const token=localStorage.getItem("token")
  console.log(token)
  return (
    <div>
      <BrowserRouter>
        <Provider>
          <Routes>
          <Route path="/" element={<Login />} />
            <Route path="/register" element={ <Register /> } />
            <Route path="/contacts" element={token ? <ContactPage /> : <Navigate replace to={"/"} />} />
            {/* <Route path="*" element={token ? <ContactPage/> : <h1>Page Not found</h1>} /> */}
          </Routes>
        </Provider>
    </BrowserRouter>
      
    </div>
  );
}

export default App;
