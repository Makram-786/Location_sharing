
import {Outlet,Navigate} from 'react-router-dom'

function isAuthenticated(){
    const userId = JSON.parse(window.localStorage.getItem('userId'))
    return userId
}
const AuthRoute = () => {
    return isAuthenticated() ? <Outlet/> : <Navigate to={'/login'} replace="true"/>
}

export default AuthRoute