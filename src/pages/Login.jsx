import {useEffect} from 'react'
import { Form,useFormAction,redirect, Link,useLocation,useNavigate } from 'react-router-dom'
import axios from 'axios'
import {ToastContainer,toast} from 'react-toastify'
const Login = () => {
    const result = useFormAction()
    const navigate = useNavigate();
    const location = useLocation()
    useEffect(()=>{
        const params = new URLSearchParams(location.search)
        const toastMessage = params.get('toast')
        if(toastMessage === 'logout'){
          toast.success("You have logout successfully!")
          // Clean the URL
          const cleanUrl = location.pathname;
          navigate(cleanUrl, { replace: true });
        }
        if(toastMessage === 'not-loggedIn'){
            toast.error('No account exists related to this email!')
            // Clean the URL
            const cleanUrl = location.pathname;
            navigate(cleanUrl, { replace: true });
          }
      },[location,navigate])
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
            <ToastContainer/>
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
         toast('You have successfully logged in')
         return redirect('/?toast=logged-in')
      
      
        
    } catch (error) {
        toast(error);
        return redirect('/login/?toast=not-loggedIn')
       
    }

}