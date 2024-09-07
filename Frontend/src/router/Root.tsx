import {Header, Footer, Hero} from '../components/index.components'
import { Outlet } from "react-router-dom"

function Root() {
  return (
    <div>
        <Header/>
        <Hero/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default Root