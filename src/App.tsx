import { Outlet } from 'react-router'
import './App.css'
import ResponsiveNavbar from './components/Navbar/Navbar'
import { Toaster } from 'sonner'
import Footer from './components/Footer/Footer'

function App() {

  return (
    <>
      <ResponsiveNavbar />
      <div className='grid grid-cols-12 gap-0 my-10'>
        <div className='col-start-2 col-end-12'>
          <Outlet />
        </div>
      </div>

      <Footer />
      <Toaster position="bottom-right" richColors expand={true} />
    </>
  )
}

export default App
