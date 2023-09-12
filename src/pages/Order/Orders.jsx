import React from 'react'
import productImage from '../../assets/triangle-background-with-vivid-colors_52683-31218.jpg'
import { Box, Button, Grid, Typography } from '@mui/material'
import OrderCard from './OrderCard'
import { request } from '../../api/request'
import { useQuery } from '@tanstack/react-query'
import { Circles } from 'react-loader-spinner'
import { useNavigate } from 'react-router'
import noDataImage from '../../assets/no-data-concept-illustration_114360-536.png'

const orders = [
    {
        id : '1',
        total : '2400',
        table_id : '10',
        order_items : [
            {
                id : '1',
                prodcut_name : 'coffe',
                total : 2400,
                quantity : 6,
                image : productImage
            }
        ]
    },
    {
        id : '2',
        total : '2400',
        table_id : '10',
        order_items : [
            {
                id : '1',
                prodcut_name : 'coffe',
                total : 2400,
                quantity : 6,
                image : productImage
            }
        ]
    },
    {
        id : '3',
        total : '2400',
        table_id : '10',
        order_items : [
            {
                id : '1',
                prodcut_name : 'coffe',
                total : 2400,
                quantity : 6,
                image : productImage
            }
        ]
    },
    {
        id : '4',
        total : '2400',
        table_id : '10',
        order_items : [
            {
                id : '1',
                prodcut_name : 'coffe',
                total : 2400,
                quantity : 6,
                image : productImage
            }
        ]
    },
]

const getOrders = () => {
    return request({
        url : '/kitchen-orders'
    })
}

const Orders = () => {
    const navigate = useNavigate()
    const ordersQuery = useQuery({
        queryKey : ['get-orders-from-server'],
        queryFn : getOrders
    })

    if(ordersQuery.isLoading){
        return <Box
            sx={{
                display : 'flex',
                alignItems : 'center',
                justifyContent : 'center',
                width : '100%',
                height : 'calc(100vh - 80px)'
            }}
        ><Circles
        height="80"
        width="80"
        color="#59c2ff"
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
      </Box>
    }

    if(ordersQuery.isError){
        if(ordersQuery.error.response){
            if(ordersQuery.error.response.status === 401){
                navigate('/')
            }else {
                return <Box
                    sx={{
                        display : 'flex',
                        alignItems : 'center',
                        justifyContent : 'center',
                        width : '100%',
                        height : 'calc(100vh - 80px)'
                    }}
                >
                    <Typography
                    variant='h4'
                    sx={{
                        textAlign : 'center'
                    }}
                >
                    Unknown Error With Status Code : {ordersQuery.error.response.status}
                </Typography>
                <Button>
                    Retry
                </Button>
                </Box>
            }
        }else if(ordersQuery.error.request) {
            return <Box
                sx={{
                    display : 'flex',
                    alignItems : 'center',
                    justifyContent : 'center',
                    width : '100%',
                    height : 'calc(100vh - 80px)'
                }}
            >
                <Typography
                variant='h4'
                sx={{
                    textAlign : 'center'
                }}
            >
                No Response Recived From Server
            </Typography>
            <Button
                onClick={() => {
                    ordersQuery.refetch()
                }}
            >
                Retry
            </Button>
            </Box>
        }else {
            return <Box
                sx={{
                    display : 'flex',
                    alignItems : 'center',
                    justifyContent : 'center',
                    width : '100%',
                    height : 'calc(100vh - 80px)'
                }}
            >
                <Typography
                variant='h4'
                sx={{
                    textAlign : 'center'
                }}
            >
                Unkonwn Error Happened
            </Typography>
            <Button
                onClick={() => {
                    ordersQuery.refetch()
                }}
            >
                Retry
            </Button>
            </Box>
        }
    }

    console.log(ordersQuery.data.data.data)
  return (
    <Box >
        {
            ordersQuery.data.data.data.length === 0 && (
                <Box
                    sx={{
                            position : 'absolute',
                            flexDirection : 'column',
                            left : '50%',
                            top : '50%',
                            transform : 'translate(-50% , -50%) '
                    }}
                >
                        <img 
                            style={{
                                maxWidth : '300px',
                                borderRadius : '12px'
                            }}
                            src={noDataImage}
                            alt='no-data-from-server'
                        />
                </Box>
            )
        }
        <Grid container spacing={4}>
            {
                ordersQuery.data.data.data.map(order => (
                    <Grid item xs={12} sm={6}>
                        <OrderCard order={order} />
                    </Grid>
                ))
            }
        </Grid>
    </Box>
  )
}

export default Orders