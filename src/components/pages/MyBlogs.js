import React from 'react'
import { Authenticator, withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css'

function MyBlogs() {
  return (
    <>
        <Authenticator>
            {({ signOut }) => (
                <div>
                    <h1>My Blogs</h1>
                    <button onClick={signOut}>Sign Out</button>
                </div>
            )}
        </Authenticator>
    </>
  )
}

export default MyBlogs