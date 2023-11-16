import React from 'react'
import Login from './Login'
import "bootstrap/dist/css/bootstrap.min.css"
import { Route, Routes } from 'react-router-dom'
import SignUp from './SignUp'
import { QueryClient, QueryClientProvider } from 'react-query'
import User from './User'
import PaginationBar from './PeginationBar'

function App() {
  const queryClient=new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <div id='root'>
        <Routes>
          <Route path='/' element={<Login/>} />
          <Route path='/signup' element={<SignUp/>} />
          <Route path='/user/:page' element={<PaginationBar/>}/>
        </Routes>
      </div>
    </QueryClientProvider>
  )
}

export default App