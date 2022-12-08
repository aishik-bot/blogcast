import React from 'react'
import { useFormik } from 'formik'
import { confirmSignUp, resendConfirmationCode } from '../../util/apiCall'
import { useNavigate } from 'react-router-dom'

function ConfirmSignUp({username}) {
    const navigate = useNavigate()
    const formik = useFormik({
        initialValues:{
            code: ''
        },
        onSubmit: async (values)=>{
            try {
                const res = await confirmSignUp(username, values.code)
                if(res=='SUCCESS')
                    console.log("User verified")
                navigate("/")
            } catch (error) {
                console.log(error)
            }
        }
    })

    const resendCode = async () => {
        try {
            await resendConfirmationCode(username);
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <>
        <form onSubmit={formik.handleSubmit}>
            <input 
                type='text' 
                id='code' 
                name='code' 
                placeholder='Enter verification code'
                value={formik.values.code}
                onChange={formik.handleChange}
            />

            <button type='submit'>Verify</button>
        </form>
        <button onClick={resendCode}> Resend Code</button>
    </>
  )
}

export default ConfirmSignUp