import React, { useState, useEffect } from 'react'
import { Auth } from 'aws-amplify'
import { useLocation, Navigate } from 'react-router-dom';
import MyBlogs from '../pages/MyBlogs';

function AuthLayout({children}) {
    const [user, setUser] = useState({})

    const {pathname} = useLocation()
    useEffect(() => {
        getUser()
        console.log(pathname)
    }, []);
    const getUser = async()=>{
        try {
          const userInfo = await Auth.currentAuthenticatedUser();
          setUser(userInfo)
        } catch (error) {
          console.log("No user logged in")
          console.log(error)
        }
      }
    
    switch(pathname){
        case "/my-blogs":
            if(user)
                return (
                    <>
                        {children}
                    </>
                )
            else
                return(
                    <>
                        <Navigate to="/login" replace/>
                    </>
                )
        default:
            return(
                <>{children}</>
            )
    }
}

export default AuthLayout