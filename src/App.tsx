
// import {fetchPageSpeed} from "./lib/pagespeed"
import { BrowserRouter, Link, Route, Routes } from "react-router"
import Home from "./Pages/Home"
import History from "./Pages/History"

const App = () => {

  // fetchPageSpeed("https://alldigitech.com", "mobile")
  return (

    <BrowserRouter>

    <nav>
      
      <Link to="/">Home</Link>
      <Link to="/history"> History</Link>
    </nav>

    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/history" element={<History/>}/>
    </Routes>
    
    </BrowserRouter>
    
  )
}

export default App