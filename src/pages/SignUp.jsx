import React from 'react'
import { Form,useFormAction,redirect,Link } from 'react-router-dom'
import axios from 'axios'
const SignUp = () => {
    const result = useFormAction()
  return (
    <>
    {result && result.success &&  <p style={{
        color:"green"
    }}>Form submission successfully!</p>}    
    <div className="wrapper">
    <Form method='post'>
    <div className="form-group">
        <label htmlFor="name">Name</label>
        <input type="text" name="name" id="name" />
    </div>
    <div className="form-group">
        <label htmlFor="email">Username/email</label>
        <input type="email" name="email" id="email" />
    </div>
    <div className="form-group">
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
    </div>
    <div className="form-group">
        <button>Register</button>
    </div>
    <p className='bottom-text'>
                Already have an account?
                <Link to={'/login'}>
                    Login here
                </Link>
            </p>
    </Form>
    </div>
    </>
  )
}

export default SignUp

export async function signUpFormAction({request}){
    const formData = await request.formData();
    const name = formData.get('name') 
    const email = formData.get('email') 
    const password = formData.get('password')
    try {
      const res = await axios.post(`${import.meta.env.VITE_APP_BACKEND_URL}/api/user/register`,{
            name,
             email,
             password
         })
         redirect('/login')
        
    } catch (error) {
        return {error:true}
    }

}