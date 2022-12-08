import React from 'react'
import { useFormik } from 'formik'
import {signIn} from '../../util/apiCall'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: async (val) =>{
      try{
        const user = await signIn(val.email, val.password)
        console.log(user)
        alert("Welcome"+user.username)
        navigate('/')
      }catch(error){
        console.log(error)
      }
    }
  })
  return(
    <>
      <h1>Login</h1>
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
          type='password' 
          id='password' 
          name='password' 
          placeholder='Enter your password'
          value={formik.values.password}
          onChange={formik.handleChange}
        />

        <button type='submit'>Log In</button>
      </form>
    </>
  )
}
