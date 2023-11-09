import React, { useEffect, useState } from 'react'
import Login from './Login'
import "bootstrap/dist/css/bootstrap.min.css"
import User from './User'
import { Route, Routes } from 'react-router-dom'
import SignUp from './SignUp'
import { QueryClient, QueryClientProvider } from 'react-query'

function App() {
  const queryClient=new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <div id='root'>
        <Routes>
          <Route path='/' element={<Login/>} />
          <Route path='/signup' element={<SignUp/>} />
        </Routes>
      </div>
    </QueryClientProvider>
  )
}

export default App