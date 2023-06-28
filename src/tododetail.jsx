import { useState,useContext, useEffect } from "react"
import { Authcontext,Todoscontext } from "./App"
import { updateDoc,addDoc,doc,deleteDoc,arrayUnion,setDoc} from "@firebase/firestore"
import { db } from "./firebase-config"
import { useParams,Navigate } from "react-router-dom"

function Tododetail () {

    const { user } = useContext(Authcontext)
    const { todos, getdata,Settodos } = useContext(Todoscontext)  // ไม่ได้ render Todoform component
    const [descriptionadd, Setdescriptionadd] = useState("")
    const [todosdescupdate, Settodosdescupdate] = useState([])
    const {todoindex} = useParams()

    const settodosdesc = async() => {
        await updateDoc(doc(db,"userData",`${user.uid}`,"todo",`${todos[todoindex].id}`)
        ,{description:todos[todoindex].doc.description})
    }

    const senddescadd = (e) => {
        Setdescriptionadd(e.target.value)
    }

    const adddesc = async(e) => {
        e.preventDefault()
        await updateDoc(doc(db,"userData",`${user.uid}`,"todo",`${todos[todoindex].id}`),{
            description: arrayUnion(`${descriptionadd}`)
        })
        await getdata()
    }

    const deletedesc = async(index) => {
        const newtodos = [...todos]
        newtodos[todoindex].doc.description.splice(index, 1)
        Settodos(newtodos)//firebase มีเเค่ arrayremove() ลบตามข้อความ
    }

    const senddescupdate = (e,index) => {
        const value = e.target.value
        const newtodos = [...todos] //ก็อป
        newtodos[todoindex].doc.description[index] = value//เปลี่ยนค่าใน index เพราะ firebase เลือกเป็น index ไม่ได้
        Settodosdescupdate(newtodos)
    }
    const Updatetodos = (e) => {
        e.preventDefault()
        Settodos(todosdescupdate)
    }

    useEffect(() => {
        settodosdesc()
    },[todos])


    if (!user) {
        return <Navigate to="/login" />
    }

    return (
    <>
        <form onSubmit={Updatetodos}>
        {todos?<p>{todos[todoindex].doc.title}</p>:null} {/* รอให้มี  todos ก่อน*/}
        {todos?todos[todoindex].doc.description.map((doc,index) => {// รอ re ender ตอน description เปลี่ยนค่า
            return <div key={index}>
                <input type="text" defaultValue={doc} onChange={(e)=>senddescupdate(e,index)}/>
                <button type="button" onClick={()=>deletedesc(index)}>delete</button>
            </div>
        }):null}
        <button type="submit">update</button>
        </form>

        <form onSubmit={adddesc}>
            <input type="text" name="moredescription" onChange={senddescadd}/>
            <button type="submit">add</button>
        </form>

    </>
    )
}

export default Tododetail