import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import {RouterProvider, Route, createBrowserRouter, createRoutesFromElements} from 'react-router-dom'

import Root from './router/Root.tsx'
import AuthRoot from './router/AuthRoot.tsx'
import {Home, Signup, Signin} from './components/index.components.ts'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<Root/>}>
        <Route path='/' element={<Home/>}/>
      </Route>
      <Route element={<AuthRoot/>}>
        <Route path='/signin' element={<Signin/>}/>
        <Route path='/signup' element={<Signup/>}/>
      </Route>
    </>
  )
)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
    {/* <Router>
      <App />
    </Router> */}
  </StrictMode>,
)
