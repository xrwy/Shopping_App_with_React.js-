import React, { useState } from 'react'
import { useContext } from 'react';
import { createContext } from 'react'
import { LOGIN, LOGOUT } from '../action_types/ActionTypes';

const UserContext = createContext();


const login = (state,payload) => {
    localStorage.setItem('user', JSON.stringify(payload))

    return {
        ...state,
        user:JSON.parse(localStorage.getItem('user'))
    }
}

const logout = (state, value) => {
    localStorage.removeItem('user')

    return {
        ...state,
        user:false,
    }
}


const UserProvider = ({ children }) => {

    const [state, setState] = useState({
        user:JSON.parse(localStorage.getItem('user')) || false,
        dispatch:(action) => {
            switch (action.type) {
                case LOGIN:
                    setState((state) => login(state, action.payload))
                    break;
                case LOGOUT:
                    setState((state) => logout(state, false))
                    break;
                default:
                    setState((state) => state);
                    break;
            }
        }
    })

  return (
    <UserContext.Provider value={state}>
        { children }
    </UserContext.Provider>
  )
}

export const useUserContext = () => useContext(UserContext);


export default UserProvider;
