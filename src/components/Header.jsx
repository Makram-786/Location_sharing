import {useNavigate} from 'react-router-dom'
import axios from 'axios'
const Header = () => {
    const navigate = useNavigate();
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
    <div>
        <ul>
            <li>
               {userId && <button onClick={logoutHandler}>Logout</button>}
            </li>
        </ul>
    </div>
  )
}

export default Header