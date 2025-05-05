import { Outlet } from 'react-router';
import Header from './components/header/Header.jsx';
import Footer from './components/footer/Footer.jsx' ;

function App() {


  return (
    <>
    <Header />
    
    <main>
      <Outlet />
    </main>

    <Footer />
    </>
  )
}

export default App
