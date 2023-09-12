import { Avatar, Box, Card, CardContent, Typography } from '@mui/material'
import React from 'react'

const OrderItem = ({orderItem}) => {
  return (
    <Card
        sx={{
            boxShadow : 'none'
        }}
    >
      <CardContent
        sx={{
            display : 'flex',
            alignItems : 'center',
            gap : '10px'
        }}
      >
        <Avatar 
          alt="Profile Image" 
          src={orderItem.image} 
          className="profile-image" 
          sx={{ width: 60, height: 60 }}
        />
        <Box>
            <Typography variant="h5" component="h2">
                {orderItem.prodcut_name}
            </Typography>
            <Typography>
                lorem dasnjdasl ajsndas ajndsja jandjkasnd lnadjsan
            </Typography>
            <Typography variant="body2" component="p">
                {`Quantity : ${orderItem.quantity}`}
            </Typography>
            <Typography variant="body2" component="p">
                {`Total : ${orderItem.total}`}
            </Typography>
        </Box>
      </CardContent>
    </Card>
  )
}

export default OrderItem