import { Outlet } from "react-router";
import Nav from "../Nav/Nav";
import Hfooter from "../Footer/Footer";




export default function Layout() {
  return (
   <>
   <Nav/>
 <div>
      <Outlet/>
 </div>

<Hfooter/>
   </>
  )
}
