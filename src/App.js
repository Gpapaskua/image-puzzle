import React  from 'react'
import { Route, Routes } from 'react-router'
import Home from './view/Home'
import Puzzle from './components/puzzle/Puzzle'


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
