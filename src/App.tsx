import { Outlet } from 'react-router'
import './App.css'
import ResponsiveNavbar from './components/Navbar/Navbar'

function App() {

  return (
    <>
      <ResponsiveNavbar />
      <div className='grid grid-cols-12 gap-0 my-10'>
        <div className='col-start-3 col-end-11'>
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default App
