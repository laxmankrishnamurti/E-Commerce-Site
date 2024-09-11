import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import {RouterProvider, Route, createBrowserRouter, createRoutesFromElements} from 'react-router-dom'

import Root from './router/Root.tsx'
import AuthRoot from './router/AuthRoot.tsx'
import {Home, Signup, Signin, ProductsComponent, ProductDetails, Cart} from './components/index.components.ts'

//Importing store to configure it with react.
import { Provider } from 'react-redux'
import { store } from './app/store.ts'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<Root/>}>
        <Route path='/' element={<Home/>}/>
        <Route path='/products/:category' element={<ProductsComponent/>}/>
        <Route path='/products/:category/:_id' element={<ProductDetails/>}/>
        <Route path='/cart' element={<Cart/>}/>
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
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </StrictMode>,
)
