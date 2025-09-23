import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom'
import Home from './Home.jsx'
import Profile from './Profile.jsx'
import Admin from './Admin/Admin.jsx'
import RequireAuth from './Admin/RequireAuth.jsx'
import Login from './Admin/Login.jsx'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />} >
      <Route path='' element={<Home/>} />
      <Route path='profile' element={<Profile />} />
      <Route path='login' element={<Login />} />
      <Route path='admin' element={<RequireAuth><Admin /></RequireAuth>} />
    </Route>
  ),
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
