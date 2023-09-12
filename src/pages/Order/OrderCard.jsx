import { Alert, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Snackbar, Typography } from '@mui/material'
import React from 'react'
import OrderItem from './OrderItem'
import Slide from '@mui/material/Slide';
import { useMutation } from '@tanstack/react-query';
import { request } from '../../api/request';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const moveToRunnerRequest = (id) => {
    return request({
        url : `/order-to-runner/${id}`,
        method : 'patch',
    })
}


const OrderCard = ({order}) => {
    const [open, setOpen] = React.useState(false);
    const [alterOpen, setAlterOpen] = React.useState(false);
    const [message , setMessage] = React.useState('')
    const [messageType , setMessageType] = React.useState('error')

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handelAlterClose = () => {
        setAlterOpen()
    }

    const handleClose = () => {
        setOpen(false);
    };
    const toRunnerHandler = () => {
        handleClickOpen()
    }

    const toRunnerMutation = useMutation({
        mutationKey : [`move-order-${order.id}-to-runner`],
        mutationFn : moveToRunnerRequest,
        onSuccess : (data) => {
            setMessage('Order Move On To Runner Successfully')
                  setMessageType('error')
                  setAlterOpen(true)
        },
          onError : (error) => {
            if (error.response){
              switch(error.response.status){
                case 401 : {
                    setMessage('you are not authorize to do this operation')
                  setMessageType('error')
                  setAlterOpen(true)
                  break
                }
                case 422 : {
                    setMessage('wrnog data given to server')
                  setMessageType('error')
                  setAlterOpen(true)
                  break
                }
                case 500 : {
                    setMessage('we have a problem in our server , come later')
                  setMessageType('error')
                  setAlterOpen(true)
                  break
                }
                case 404 : {
                    setMessage("we out of space , we can't find your destenation")
                  setMessageType('error')
                  setAlterOpen(true)
                  break
                }
                default : {
                    setMessage("unkown error accoure : request falid with status code" + error.response.status)
                  setMessageType('error')
                  setAlterOpen(true)
                  break
                }
              }
            }else if(error.request){
                setMessage('server response with nothing , Check your internet connection or contact support if the problem persists')
              setMessageType('error')
              setAlterOpen(true)
            }else {
                setMessage('unknow error : ' + error.message)
              setMessageType('error')
              setAlterOpen(true)
            }
          }
    })

    const handelConfirm = () => {
        toRunnerMutation.mutate(order.id)
    }
  return (
    <>
    <Box
        sx={{
            boxShadow : '1px 1px 10px -5px #0000005c',
            borderRadius : '8px'
        }}
    >
        <Box
            sx={{
                display : 'flex',
                alignItems : 'center',
                justifyContent : 'space-between',
                padding : '8px',
                borderRadius : '8px 8px 0px 0px',
                position : 'relative',
                overflow : 'hidden'
            }}
        >
            <Box
                sx={{
                    width : '100%',
                    height : '100%',
                    position : 'absolute',
                    backgroundColor : '#b5e5ff5f',
                    filter : 'blur(10px)',
                    zIndex : '-1'
                }}
            >

            </Box>
            <Box>
                <Typography>
                    {`Order ID: ${order.id}`}
                </Typography>
                <Typography>
                    {`Table Number: ${order.table_id}`}
                </Typography>
                <Typography
                    sx={{
                        marginBottom : '10px'
                    }}
                    >
                    {`Total : ${order.total}`}
                </Typography>
            </Box>
            <Box>
                
                <Button
                    color='success'
                    variant='outlined'
                    onClick={toRunnerHandler}
                >
                    done
                </Button>
            </Box>
        </Box>
        <Box>
            {
                order.order_items.map(orderItem => (
                    <OrderItem key={orderItem.id} orderItem={orderItem} />
                    ))
                }
        </Box>
    </Box>
    <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Use Google's location service?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handelConfirm}>Agree</Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={alterOpen} autoHideDuration={4000} onClose={handelAlterClose}>
        <Alert onClose={handelAlterClose} severity={messageType} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </>
  )
}

export default OrderCard