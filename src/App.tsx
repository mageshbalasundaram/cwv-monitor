
// import {fetchPageSpeed} from "./lib/pagespeed"
import { BrowserRouter, Link, Route, Routes } from "react-router"
import Home from "./Pages/Home"
import History from "./Pages/History"

const App = () => {

  // fetchPageSpeed("https://alldigitech.com", "mobile")
  return (

    <BrowserRouter>

    <nav className="flex justify-between border-b-2 border-gray-200 p-4 ">
      <div className="text-2xl text-blue-800 font-semibold">
        CWV Monitor 
      </div>
      <div className="text-blue-600 font-medium flex gap-2.5">
         <Link to="/">Home</Link>
      <Link to="/history"> History</Link>
      </div>
     
    </nav>

    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/history" element={<History/>}/>
    </Routes>
    
    </BrowserRouter>
    
  )
}

export default App