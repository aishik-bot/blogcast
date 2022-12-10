import React, { useState, useEffect } from 'react'
import { Auth } from 'aws-amplify'
import { useLocation, useNavigate } from 'react-router-dom';


function AuthLayout({children}) {
    const [user, setUser] = useState()
    
    const navigate = useNavigate() 

    const {pathname} = useLocation()
    useEffect(() => {
        getUser()
        console.log(pathname)
    }, [pathname]);
    const getUser = async()=>{
        try {
            console.log("Inside get user")
          const userInfo = await Auth.currentAuthenticatedUser();
          setUser(userInfo)
          console.log("Auth layout",user)
        } catch (error) {
          console.log("AuthLayout Error: No user logged in")
          console.log(error)
        }
      }
    
    switch(pathname){
        case '/my-blogs':
            if(user)
                return (
                    console.log("Inside my-blogs if",user),
                    <>
                        {children}
                    </>
                )
            else
                navigate('/login')
        default:
            return(
                console.log("Inside default", pathname, user),
                <>{children}</>
            )
    }
}

export default AuthLayout