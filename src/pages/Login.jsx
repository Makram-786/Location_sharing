import React from 'react'
import { Form,useFormAction,redirect, Link } from 'react-router-dom'
import axios from 'axios'
const Login = () => {
    const result = useFormAction()
  return (
    <div className='wrapper'>
        <Form method='post'>
            <div className="form-group">
                <label htmlFor="email">Username/email</label>
                <input type="email" name="email" id="email" />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" />
            </div>
            <div className="form-group">
                <button>Sign In</button>
            </div>
            <p className='bottom-text'>
                Not have an account?
                <Link to={'/signup'}>
                    Sign up
                </Link>
            </p>
        </Form>
    </div>
  )
}

export default Login

export async function loginFormAction({request}){
    const formData = await request.formData();
    const email = formData.get('email') 
    const password = formData.get('password')
    
    try {
      const res = await axios.post(`${import.meta.env.VITE_APP_BACKEND_URL}/api/user/login`,{
             email,
             password
         }, {withCredentials:true})
         window.localStorage.setItem('userId', JSON.stringify(res.data.userId))
         return redirect('/')
      
      
        
    } catch (error) {
        return {error:true}
    }

}