import React  from 'react'
import { Route, Routes } from 'react-router'
import Home from './components/Home'
import Puzzle from './components/Puzzle'


const App = () => {

  return (
    <div>
      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/:lvl" element={ <Puzzle /> } />
      </Routes>
    </div>
  )
}

export default App
