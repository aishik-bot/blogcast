import React, { useState, useEffect } from 'react'
import { Auth } from 'aws-amplify'
import { useLocation, useNavigate } from 'react-router-dom';


function AuthLayout({children}) {
    const [user, setUser] = useState()
    
    const navigate = useNavigate() 

    const {pathname} = useLocation()
    useEffect(() => {
        console.log("Auth layout executed")
        getUser()
        console.log(pathname)
    }, [pathname]);
    const getUser = async()=>{
        try {

          console.log("Inside get user from auth layout-------------")
          const userInfo = await Auth.currentAuthenticatedUser();
          console.log("userInfo",userInfo)
          setUser(userInfo)
          console.log("Auth layout",user)
        } catch (error) {
          console.log("AuthLayout Error: No user logged in")
          console.log(error)
          setUser()
        }
      }

    const guestUser = ()=>{
        console.log("Inside guest user");
        navigate("/login")
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
            else if(!user)
                guestUser()
            break
        default:
            return(
                console.log("Inside default", pathname, user),
                <>{children}</>
            )
    }
}

export default AuthLayout