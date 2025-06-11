import {useNavigate,useLocation, Link} from 'react-router-dom'
import axios from 'axios'
const Header = () => {
    const navigate = useNavigate();
    const location = useLocation()
    let userId = JSON.parse(window.localStorage.getItem('userId'))
    const logoutHandler = async() =>{
        try{
          const res = await axios.post('http://localhost:5000/api/user/logout',{},{withCredentials:true})
          window.localStorage.removeItem('userId')
          console.log(res.data.message)
          return navigate('/login')
        }catch(error){
          throw error
        }
    
      }
  return (
    <div className='main-header'>
          <Link className="logo" to={'/'}>
            Logo
          </Link>
        <ul>
            <li>
               {userId && <button className='btn-logout' onClick={logoutHandler}>Logout</button>}
            </li>
            {
              location.pathname !== '/new-place' &&
            <li>
            <button className='btn-add-place' onClick={()=> navigate('/new-place')}>Add New Place</button>
            </li>
            }
        </ul>
    </div>
  )
}

export default Header