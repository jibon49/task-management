import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './Components/Home/Home.jsx';
import Contact from './Components/Contact/Contact.jsx';
import Dashboard from './Components/Dashboard/Dashboard.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children : [
      {
        path: "/",
        element : <Home></Home>
      },
      {
        path : "/contact",
        element : <Contact></Contact>
      },
      {
        path : "/dashboard",
        element : <Dashboard></Dashboard>
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
