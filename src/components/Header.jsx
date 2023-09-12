import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router'
import { logout, useJawadAuthController } from '../context'

const Header = () => {
    const navigate = useNavigate()
    const [, dispatch] = useJawadAuthController()
    const logUserOut = () => {
        logout(dispatch , null)
        navigate('/')
    }
  return (
    <Box
        sx={{
            display : 'flex',
            alignItems : 'center',
            justifyContent : 'space-between',
            height : '80px',
            marginBottom : '15px'
        }}
    >
        <Typography
            color={'#59c2ff'}
            variant='h5'
        >
            Kitchen Dashboard
        </Typography>
        <Box>
            <Button
                variant='contained'
                color='error'
                onClick={logUserOut}
            >
                Logout
            </Button>
        </Box>
    </Box>
  )
}

export default Header