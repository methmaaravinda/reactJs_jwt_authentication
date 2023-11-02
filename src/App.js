import React from 'react'
import Login from './Login'
import "bootstrap/dist/css/bootstrap.min.css"
import User from './User'
import { Route, Routes } from 'react-router-dom'
import SignUp from './SignUp'

function App() {
  return (
    <div id='root'>
        <Routes>
          <Route path='/' element={<Login/>} />
          <Route path='/signup' element={<SignUp/>} />
        </Routes>
    </div>
  )
}

export default App