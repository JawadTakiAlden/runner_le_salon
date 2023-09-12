import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { request } from '../api/request';
import { useMutation } from '@tanstack/react-query';
import * as yup from 'yup'
import { Formik } from 'formik';
import { useNavigate } from 'react-router';
import { login, useJawadAuthController } from '../context';
import { Alert, Snackbar } from '@mui/material';
import { Circles } from 'react-loader-spinner';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://le_salon.com/">
        Le Salon
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const loginUserIn = (values) => {
    return request({
        url : '/login',
        method : 'post',
        data : values
    })
}

export default function Login() {
  
    const navigate = useNavigate()
    const [ , dispatch] = useJawadAuthController()
    const [open, setOpen] = React.useState(false);
    const [message , setMessage] = React.useState('')
    const [messageType , setMessageType] = React.useState('error')

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
    const loginUserMutation = useMutation({
        mutationKey : ['login-user-in'],
        mutationFn : loginUserIn,
        onSuccess : (data) => {
            console.log(data)
            login(dispatch , {
              token : data.data.data.token,
              user : data.data.data.user
            })
            navigate('/orders')
          },
          onError : (error) => {
            if (error.response){
              switch(error.response.status){
                case 401 : {
                    setMessage('you are not authorize to get in our system')
                  setMessageType('error')
                  setOpen(true)
                  break
                }
                case 422 : {
                    setMessage('email or password is wrong')
                  setMessageType('error')
                  setOpen(true)
                  break
                }
                case 500 : {
                    setMessage('we have a problem in our server , come later')
                  setMessageType('error')
                  setOpen(true)
                  break
                }
                case 404 : {
                    setMessage("we out of space , we can't find your destenation")
                  setMessageType('error')
                  setOpen(true)
                  break
                }
                default : {
                    setMessage("unkown error accoure : request falid with status code" + error.response.status)
                  setMessageType('error')
                  setOpen(true)
                  break
                }
              }
            }else if(error.request){
                setMessage('server response with nothing , Check your internet connection or contact support if the problem persists')
              setMessageType('error')
              setOpen(true)
            }else {
                setMessage('unknow error : ' + error.message)
              setMessageType('error')
              setOpen(true)
            }
          }
    })


    const loginHandler = (values) => {
        loginUserMutation.mutate(values)
    }

    if(loginUserMutation.isLoading){
       return ( <Box
            sx={{
                display : 'flex',
                alignItems : 'center',
                justifyContent : 'center',
                width : '100%',
                height : '100vh'
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
       )
    }

  return (
    <>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box sx={{ mt: 1 }}>
            <Formik
                validationSchema={validationSchema}
                initialValues={initialValues}
                onSubmit={loginHandler}
            >
                {
                    ({
                        values,
                        errors,
                        touched,
                        handleBlur,
                        handleChange,
                        handleSubmit,
                    }) => (
                        <form onSubmit={handleSubmit}>
                            <TextField
                                margin="normal"
                                fullWidth
                                id="email"
                                variant='outlined'
                                label="Email Address"
                                name="email"
                                onBlur={handleBlur}
                                value={values.email}
                                onChange={handleChange}
                                error={!!errors.email && !!touched.email}
                                helperText={errors.email && touched.email}
                                autoComplete="email"
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                fullWidth
                                variant='outlined'
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                onBlur={handleBlur}
                                value={values.password}
                                onChange={handleChange}
                                error={!!errors.password && !!touched.password}
                                helperText={errors.password && touched.password}
                                autoComplete="current-password"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign In
                            </Button>
                        </form>
                    )
                }
            </Formik>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
        <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={messageType} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
        </>
  );
}

const validationSchema = yup.object({
    email : yup.string().email().required('email field is required'),
    password : yup.string().min(7).required('password field is required')
})

const initialValues = {
    email : '',
    password : ''
}