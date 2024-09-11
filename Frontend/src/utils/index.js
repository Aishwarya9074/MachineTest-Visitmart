import { jwtDecode } from "jwt-decode"

export const savecreds=(token)=>{
    const decodedToken=jwtDecode(token)
    localStorage.setItem('token',token)
    localStorage.setItem('id',decodedToken.id)
    localStorage.setItem('role',decodedToken.role)
}

export const isAuthenticated=()=>{
    try{
        const decoded=jwtDecode(localStorage.getItem('token'))
        console.log(decoded)
        const currentDate=Date.now()/1000
        return currentDate<decoded.exp

    }
    catch(e){
        return false
    }
}