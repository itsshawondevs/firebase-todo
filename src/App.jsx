import { useEffect, useState } from "react";
import { getDatabase, ref, set, push, onValue, remove, update } from "firebase/database";

function App() {
  let [text, setText] = useState('')
  let [error, setError] = useState('')
  let [todoArr, setTodoArr] = useState([])
  let [updateBtn, setUpdateBtn] = useState(true)

  let [todoId, setTodoId] = useState({})

  const db = getDatabase();
  
  // write operation

  let handleSubmit = () => {
    if(text !== ''){
      set(push(ref(db, 'allTodo')), {
        myText: text,
      })
      setText('')
      setError('')
    }else{
      setError('*invaild task')
    }
  }

  // Read Operation

  useEffect(()=>{
    const todoRef = ref(db, 'allTodo');
    onValue(todoRef, (snapshot) => {
      let arr = []
        snapshot.forEach((item)=>{
          arr.unshift({
            ...item.val(),
            id: item.key
          })
        })
        setTodoArr(arr);
    });
  },[])

  // Delete Operation

  let handleDelete = (deleteId) => {
    remove(ref(db, 'allTodo/' + deleteId))
  }

  // Update Operation
  let handleEdit = (editTodo) => {
      setText(editTodo.myText);
      setUpdateBtn(false)
      setTodoId(editTodo)
  }

  let handleUpdate = () => {
    update(ref(db, 'allTodo/' + todoId.id),{
      myText: text
    })
    setUpdateBtn(true)
    setText('')
  }

  return (
    <>
        <div className="bg-blue-600 w-[500px] mx-auto mt-10 py-5 px-8">
          <h1 className="text-white text-3xl capitalize text-center underline mb-[20px]">todo-app</h1>
          <div className="flex justify-between">
            <input onChange={(e)=>setText(e.target.value)} type="text" value={text} placeholder="enter your task" className="w-[320px] px-2 py-1 text-lg capitalize outline-0"/>
            {
              updateBtn
              ?
              <button onClick={handleSubmit} className="w-[100px] bg-white ml-5 py-1 text-lg capitalize">add todo</button>
              :
              <button onClick={handleUpdate} className="w-[100px] bg-white ml-5 py-1 text-lg capitalize">Update</button>
            }
          </div>
          <p className="text-red-600 capitalize">{error}</p>
            <ol className="list-decimal list-outside marker:text-white text-white mt-5 flex flex-col gap-y-3">
              {
                todoArr.map((item,index)=>(
                  <>
                    <div className="flex justify-between bg-[#18118594] py-[6px] px-1 text-lg capitalize">
                      <li key={index}>{item.myText}</li>
                        <div className="flex gap-x-[6px]">
                          <button onClick={()=>handleEdit(item)} className="bg-[#26a7dacf] w-[60px]">Edit</button>
                          <button onClick={()=>handleDelete(item.id)} className="bg-[#26a7dacf] w-[70px]">Delete</button> 
                        </div>
                    </div>
                  </>
                ))
              }
            </ol>
        </div>
    </>
  )
}

export default App
