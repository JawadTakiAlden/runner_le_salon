import { createContext, useContext, useEffect, useMemo, useReducer } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";
import { request } from "../api/request";

const JawadAuth = createContext(null);

JawadAuth.displayName = "JawadAuthContext";


function reducer(state, action) {
    switch (action.type) {
      case 'login' : {
        Cookies.set('_kitchen_le_salon_token' , action.value.token)
        Cookies.set('_is_kitchen_le_salon_auth' , true)
        return {
            isAuth : true,
            user : action.value.user,
            token : Cookies.get('_kitchen_le_salon_token')
        }
      }
      case 'logout' : {
        Cookies.remove('_kitchen_le_salon_token')
        Cookies.remove('_profile')
        Cookies.remove('_is_kitchen_le_salon_auth')
        return {
            ...state,
            isAuth : false,
            user : '',
            token : ''
        }
      }
      default: {
        throw new Error(`Unhandled action type: ${action.type}`);
      }
    }
  }


function JawadAuthControllerProvider({ children }) {
    const initialState = {
      user : Cookies.get('_profile'),
      isAuth : Cookies.get('_is_kitchen_le_salon_auth'),
      token : Cookies.get('_kitchen_le_salon_token')
    };
  
    const [controller, dispatch] = useReducer(reducer, initialState);
  
    const value = useMemo(() => [controller, dispatch], [controller, dispatch]);
  
    return <JawadAuth.Provider value={value}> {children} </JawadAuth.Provider>;
  }



  function useJawadAuthController() {
    const context = useContext(JawadAuth);
  
    if (!context) {
      throw new Error("useSoftUIController should be used inside the SoftUIControllerProvider.");
    }
  
    return context;
  }

  const login = (dispatch , value) => {
    dispatch({
        type : 'login',
        value : value
    })
  }

  const logout = (dispatch , value) => {
    dispatch({type : 'logout'})
  }

  const RequireAuth = ({children}) => {
    const [controller] = useContext(JawadAuth);
    const { isAuth } = controller
    const navigate = useNavigate()

    
    useEffect(() => {
        if(!isAuth){
            navigate('/')
        }
      })

    return children
}

  export {
    JawadAuthControllerProvider,
    useJawadAuthController,
    login,
    logout,
    RequireAuth
  }