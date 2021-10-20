import { useEffect } from 'react'
import NavbarElem from '../../components/NavbarElem'
import PageTitle from '../../components/PageTitle'
import './Home.css'





const Home = () => {
  
  if (localStorage.getItem("token")) {
      window.location = "/home";
  } else {
    window.location = "/login"
  }

  return (
    <>
      {}
      <NavbarElem />
      <PageTitle title='Welcome User' />
    </>
  )
}

export default Home
