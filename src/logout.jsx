import { useContext } from "react"
import {signOut} from "@firebase/auth"
import { auth } from "./firebase-config"
import { Authcontext } from "./App"

function Logout() {

   const {user} = useContext(Authcontext)

    
    const logout = () => {
        user?signOut(auth):null
    }
        

    return (
        <>
            <button type="button" onClick={logout}>logout</button>
        </>
    )
}

export default Logout