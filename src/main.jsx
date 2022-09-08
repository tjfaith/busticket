import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import App from './App'; 
import Admin from './admin/Admin'; 
import AdminSignup from './admin/pages/Signup';
import AdminLogin from './admin/pages/login';

import { ContextProvider } from './admin/contexts/ContextProvider';
import PrivateRoutes from './admin/pages/PrivateRoutes';
import SnackbarProvider from 'react-simple-snackbar' 

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <SnackbarProvider>

  <React.StrictMode>
       <BrowserRouter>
       <ContextProvider>
       <Routes>
        <Route path="/*" element={ <App /> } />
        <Route element={ <PrivateRoutes /> }>
            <Route path="/admin/*" element={ <Admin /> } />
        </Route>
        <Route path="/admin/signup" element={ <AdminSignup /> } />
        <Route path="/admin/login" element={ < AdminLogin /> } />
      </Routes>
    </ContextProvider>
       </BrowserRouter>
     
  </React.StrictMode>
  </SnackbarProvider>

);
