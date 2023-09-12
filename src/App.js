import React from 'react'
import { Route, Routes, useLocation } from 'react-router'
import Login from './pages/Login'
import Orders from './pages/Order/Orders'
import { Box, Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import './App.css'
import Header from './components/Header'
import { RequireAuth } from './context'

const defaultTheme = createTheme();

const App = () => {
  const location = useLocation()
  return (
    <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <Box
          sx={{
            paddingLeft : {xs : '5px' , sm : '20px' , md : '30px' , lg : '40px'},
            paddingRight : {xs : '5px' , sm : '20px' , md : '30px' , lg : '40px'},
          }}
        >
          {
            location.pathname !== '/' && (
              <Header />
            )
          }
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/orders' element={<RequireAuth><Orders /></RequireAuth>} />
          </Routes>
        </Box>
    </ThemeProvider >
  )
}

export default App