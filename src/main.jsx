import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'
import Home from './Components/Home/Home.jsx';
import Contact from './Components/Contact/Contact.jsx';
import Dashboard from './Components/Dashboard/Dashboard.jsx';
import AuthProviders from './Components/AuthProviders/AuthProviders.jsx';
import Register from './Components/Register/Register.jsx';
import Login from './Components/Login/Login.jsx';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute.jsx';
import CreateTask from './Components/CreateTask/CreateTask.jsx';
import MyTask from './Components/MyTask/MyTask';
const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: "/",
        element: <Home></Home>
      },
      {
        path: "/contact",
        element: <Contact></Contact>
      },
      {
        path: "/register",
        element: <Register></Register>
      },
      {
        path: "/login",
        element: <Login></Login>
      },
    ]
  },
  {
    path: "/dashboard",
    element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
    children : [
      {
        path : "create-task",
        element : <CreateTask></CreateTask>
      },
      {
        path : "my-task",
        element : <MyTask></MyTask>
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProviders>
        <div className=''>
          <RouterProvider router={router} />
        </div>
      </AuthProviders>
    </QueryClientProvider>
  </React.StrictMode>,
)
