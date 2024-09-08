import {Header, Footer} from '../components/index.components'
import { Outlet } from "react-router-dom"

function Root() {
  return (
    <div>
        <Header/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default Root