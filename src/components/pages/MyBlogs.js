import React, {useState, useEffect} from 'react'
import { Authenticator} from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css'
import { Auth } from 'aws-amplify';

function MyBlogs() {
  const [user, setUser] = useState({});
  useEffect(() => {
    getUser();
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
  return (
    <>
          <div>
              <h1>My Blogs</h1>
              {/* <h3>Hi {user.attributes.preferred_username}</h3> */}
              <button >Sign Out</button>
              {/* <button onClick={signOut}>Sign Out</button> */}
          </div>
    </>
  )
}

export default MyBlogs