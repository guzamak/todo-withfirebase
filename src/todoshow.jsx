import { useContext, useEffect } from "react"
import { Authcontext,Todoscontext } from "./App"
import { db } from "./firebase-config"
import { updateDoc, doc, deleteDoc } from "@firebase/firestore"
import { Link} from "react-router-dom"


function Todoshow() {

    const { user } = useContext(Authcontext)// re render ตอน ค่าข้างใน เปลี่ยน
    const { todos, getdata, Settodos} = useContext(Todoscontext)

    const updatecheck = async (e, todoid) => {
        if (user) {
            await updateDoc(doc(db, "userData", `${user.uid}`, "todo", `${todoid}`), {//รอก่อน update ก่อนเพราะท่ากดเร็ว getdata()จะได้ค่าเดิม
                checked: e.target.checked // ไม่ต้อง getdata ใหม่เห็นอยู่เเล้วว่าเช็คไหม
            })
            getdata()//ค่า todos ใน db เปลี่ยนค่า
        }
    }

    const deletedata = async (todoid) => {
        await deleteDoc(doc(db, "userData", `${user.uid}`, "todo", `${todoid}`))
        getdata()//todos เปลี่ยนค่า

    }


    return (
        <>
            {todos? user ? todos.length != 0 ?
                todos.map((todo, index) => {
                    return <div key={index}> {/*กำหนด key */}
                        <input type="checkbox"
                            defaultChecked={todo.doc.checked}//.doc
                            onChange={(e) => updatecheck(e, todo.id)}
                        />
                        <Link to={`${index}`  }>  {/*/เปลี่ยนที่ ไม่มี / นำมาต่อ */}
                            <p className={todo.doc.checked ? "line-through" : null}>{todo.doc.title}</p>
                        </Link>
                        <button type="button" onClick={() => deletedata(todo.id)}>delete</button>
                    </div>
                }) : <p>ไม่มีสิ่งที่ต้องทำ</p> : null:null
            }

        </>
    )
}

export default Todoshow