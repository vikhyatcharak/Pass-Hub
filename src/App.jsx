import './App.css'
import Navbar from './components/Navbar'
import UI from './components/UI'
import Footer from './components/Footer'

function App() {


  return (
    <>
      <div className='absolute inset-0 -z-10 w-full bg-green-50 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)]'>
        {/* to give the whole app the background */}
        <Navbar />

        <UI />

        <Footer />
      </div>
    </>
  )
}

export default App
