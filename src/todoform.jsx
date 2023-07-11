import { useState, useContext, useEffect,} from "react"
import { db } from "./firebase-config"
import { addDoc, collection, getDocs, arrayUnion, serverTimestamp, orderBy, query, where } from "@firebase/firestore"
import { Authcontext,Todoscontext } from "./App"
import Todoshow from "./todoshow"
import Logout from "./logout"
import { Navigate} from "react-router-dom"

function Todoform() {

    const { user } = useContext(Authcontext)
    const { todos, getdata, Settodos} = useContext(Todoscontext)

    const [todo, Settodo] = useState(null)
    const [searchdata, Setsearchdata] = useState("")

    const senddata = (e) => {
        var name = e.target.name
        var value = e.target.value
        Settodo({ ...todo, [name]: value })//[] ตัวเเปร

    }
    const submitform = (e) => {
        e.preventDefault()
        addDoc(collection(db, "userData", `${user.uid}`, "todo"),
            {
                title: `${todo.title}`,
                description: arrayUnion(`${todo.description}`),
                timestamp: serverTimestamp(),
                checked: false
            })//adddocใช้คู่กับ collection เพื่อ สร้าง id ให้doc ที่อยู๋ข้างใน collection 
        getdata()//มีข้อมูลใหม่
    }

    const sendsearch = async (e) => {
        await getdata() //รี todosให้เหมือนเดิมก่อน search ครั้งที่สอง //รอให้เสร็จก่อน
        Setsearchdata(e.target.value)//คล้าย .then ใช้ useeffect ต่อ usestate เเล้วนำค่า state ใหม่ไปใช้
        //console.log(searchdata)//ค่าก่อน re render
    }
    useEffect(() => {
        if (todos){
        const newtodos = todos.filter((todo) => { return todo.doc.title.toLowerCase().includes(searchdata.toLowerCase()) })
        Settodos(newtodos)}
    }, [searchdata]) //render ทุกครั้งที่ serachdata เปลี่ยน

    if (!user) {
        return <Navigate to="/login" />
    }

    return (
        <>
            <div><input type="text" placeholder="searchtitle" onChange={sendsearch} /></div>
            <form onSubmit={submitform}>
                <input type="text" name="title" onChange={senddata} required />
                <input type="text" name="description" onChange={senddata} required />
                <button type="submit">Submit</button>
            </form>
            <Todoshow />
            <Logout />
        </>
    )
}

export { Todoscontext }
export default Todoform 
