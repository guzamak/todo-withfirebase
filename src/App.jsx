import { useEffect, useState, createContext } from 'react'
import { addDoc, collection, getDocs, arrayUnion, serverTimestamp, orderBy, query, where } from "@firebase/firestore"
import { auth, db } from "./firebase-config"
import { onAuthStateChanged } from "@firebase/auth"
import Usercreatelogin from './usercreate_login'
import Todoform from './todoform'
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route, Navigate } from 'react-router-dom'
import './App.css'
import Tododetail from './tododetail'


const Authcontext = createContext("")//สร้าง context ไว้นอก component app ให้ export ใด้ เพราะอยู๋นอกเหมือนกับ export
// กัน undefind
const Todoscontext = createContext("")//"" กัน context = undefind
function App() {

  const [user, Setuser] = useState()
  const [todos, Settodos] = useState()

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        Setuser(user)
      } else {
        Setuser(null)
      }
    })
    //console.log(user) //จะ return undefied ก่อน เพราะ setstate จะ re renders ถึงเปลี่ยนค่า
  }, [])// render app 

  const getdata = async () => {
    const todocol = await getDocs(query(collection(db, "userData", `${user.uid}`, "todo"),
      orderBy("timestamp")//orderby ใช้คู่กับ qurey//qurey เกี่ยวกับการนำเข้าข้อมูล
    ))//promise//getdocs()ใช้รับข้อมูลทั้ง Collection
    const alltodo = []
    todocol.forEach((doc) => {
      alltodo.push({
        id: doc.id,
        doc: doc.data()
      })//for each ไม่รับ async function setstate เป็น async hook //doc.id()เอาid
    })
    Settodos(alltodo)
  }

  useEffect(() => {
    if (user) {
      getdata()
    }
  }, [user])

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' >
        <Route path="login" element={<Usercreatelogin />} />
        <Route index element={<Todoform />} />
        <Route path=':todoindex' element={<Tododetail />} />
      </Route>
    )
  )//ตัวเเปร นำไปใส่ router ของ component RouterProvider

  return (
    <Authcontext.Provider value={{ user }}> {/*app render ทุกรอบ*/}
      <Todoscontext.Provider value={{todos, Settodos, getdata}}>
        <RouterProvider router={router} />
      </Todoscontext.Provider>
    </Authcontext.Provider>
  )
}

export { Todoscontext }
export { Authcontext }
export default App
