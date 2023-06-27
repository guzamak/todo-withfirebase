import {  useState,useContext} from "react"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword} from "@firebase/auth"
import { auth } from "./firebase-config"
import { Authcontext } from "./App"
import { Navigate } from "react-router-dom"


function Usercreatelogin() {


    const {user} = useContext(Authcontext)

    const [data, Setdata] = useState(null) 
    const [signuppassword, Setsignup_password] = useState(false)
    const [signinpassword, Setsignin_password] = useState(false)

    const senddata = (e) => {
        var name = e.target.name
        var value = e.target.value
        Setdata({ ...data, [name]: value })//[] ตัวเเปร
    }
    
    const  signupcheck = () => {
        Setsignup_password(!signuppassword)//ตรงข้าม p_visble
    }
    const  signincheck = () => {
        Setsignin_password(!signinpassword)//ตรงข้าม p_visble
    }

    const createuser = (e) => {
        e.preventDefault()
        createUserWithEmailAndPassword(auth, data.email, data.password)
    }

    const login = (e) => {
        e.preventDefault()
        signInWithEmailAndPassword(auth, data.email, data.password)
    }

    if (user) {
         return <Navigate to={`/`}/>//เป็น html ตัวเเปร ใส่ {}
    }
    
    return (
        <>
            <form onSubmit={createuser}>
                <label>username</label>
                <input type="email" name="email" onChange={senddata} required />
                <input type={signuppassword ? "text" : "password"} name="password" onChange={senddata} required />
                <input type="checkbox" name="p_visable" onChange={signupcheck} />
                <button type="submit">submit</button>
            </form>

            <form onSubmit={login} >
                <label>username</label>
                <input type="email" name="email" onChange={senddata} required />
                <input type={signinpassword ? "text" : "password"} name="password" onChange={senddata} required />
                <input type="checkbox" name="p_visable"  onChange={signincheck} />
                <button type="submit">login</button>
            </form>


        </>)
}

export default Usercreatelogin