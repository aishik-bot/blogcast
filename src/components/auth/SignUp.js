import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik'
import { signUp } from '../../util/apiCall';
import ConfirmSignUp from './ConfirmSignUp';


function SignUp() {
  //const navigate = useNavigate();
  const [user, setUser] = useState({})
  useEffect(() => {
    console.log(user)
  }, []);
  const formik = useFormik({
    initialValues: {
      email: '',
      username: '',
      password: ''
    },
    onSubmit: async (val) =>{
      try{
        const userInfo = await signUp(val.email, val.username, val.password)
        setUser(userInfo)
        console.log({user})
      }catch(error){
        console.log(error)
      }
    }
  })
  if(!user.username){
    return (
      <>
        <h1>Sign Up</h1>
        <form onSubmit={formik.handleSubmit}>
          <input 
            type='email' 
            id='email' 
            name='email' 
            placeholder='Enter your email'
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          <input 
            type='text' 
            id='username' 
            name='username' 
            placeholder='Enter a preferred username'
            value={formik.values.username}
            onChange={formik.handleChange}
          />
          <input 
            type='password' 
            id='password' 
            name='password' 
            placeholder='Enter your password'
            value={formik.values.password}
            onChange={formik.handleChange}
          />

          <button type='submit'>Sign Up</button>
        </form>
      </>
    )
  }
  return <ConfirmSignUp username={user.username}/>
}

export default SignUp