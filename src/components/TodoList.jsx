import React, { useEffect, useState } from 'react'
import { TiPencil } from 'react-icons/ti'
import { BsTrash } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { addTodo, setTodo } from '../features/todoSlice'

const TodoList = () => {
    const todo = useSelector((state) => state.todos.todo)
    const sort = useSelector((state) => state.todos.sort)
    const dispatch = useDispatch();

    const [showModal, setShowModal] = useState(false)
    const [currTodo, setCurrTodo] = useState(false)
    const [newTask, setNewTask] = useState('')
    console.log(newTask)

    const handleAddTask = (task) => {
            if(task.trim().length === 0){
                alert("Please enter a task");
            } else {
                
                dispatch(addTodo({
                    task: task,
                    id: Date.now(),
                }));
                setNewTask('');
                setShowModal(false);
            }
        
    }

    useEffect(() => {
        if(todo.length > 0){
            localStorage.setItem('todo', JSON.stringify(todo));
        }
    },[todo])

    useEffect(() => {
        const localTodo = JSON.parse(localStorage.getItem('todo'));
        if(localTodo){
            dispatch(setTodo(localTodo))
        }
    }, [dispatch])

  return (
    <div className='w-[40%] '>
        <div>
            {
                showModal && (
                    <div className='fixed w-full top-0 left-0 h-full bg-[rgba(0,0,0,.5)] flex items-center justify-center'>
                        <div className='bg-white w-[20%] p-6 rounded-md gap-y-4 flex flex-col'>
                            <input type="text" name="" id="" 
                            placeholder={currTodo ? "Update Your Task" : "Enter Your Taks"} 
                            value={newTask}
                            onChange={(e) => setNewTask(e.target.value)}
                            className='outline-none border-b-2  font-normal rounded-sm px-1 w-full py-[8px] border-[#C7C8CC]'/>
                            <div>
                                {
                                    currTodo ? (
                                        <>
                                           <div className='flex justify-between'>
                                            <button onClick={() => setShowModal(false)} className='bg-[#2F3645] text-[14px] font-medium px-6 py-[8px] hover:shadow-none rounded-sm text-white shadow-md'>Cancel</button>
                                            <button onClick={() => setShowModal(false)} className='bg-[#FF7D29] text-[14px] font-medium px-6 py-[8px] hover:shadow-none rounded-sm text-white shadow-md'>Update</button>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className='flex justify-between'>
                                            <button onClick={() => setShowModal(false)} className='bg-[#2F3645] text-[14px] font-medium px-6 py-[8px] hover:shadow-none rounded-sm text-white shadow-md'>Cancel</button>
                                            <button onClick={() =>  handleAddTask(newTask)} className='bg-[#FF7D29] text-[14px] font-medium px-6 py-[8px] hover:shadow-none rounded-sm text-white shadow-md'>Add Task</button>
                                            </div>
                                        </>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
       
        <div className='flex w-full justify-between items-center'>
            <button 
            onClick={() => setShowModal(true)}
            className='bg-[#FF7D29] text-xl font-semibold px-6 py-[5px] rounded-sm text-white shadow-lg'
            >Add Task</button>
            <select default={"All"} className='text-xl font-semibold px-6 py-[5px] rounded-sm text-white shadow-lg outline-none bg-[#2F3645]'>
                <option value="All">All</option>
                <option value="Completed">Completed</option>
                <option value="InComplete">InComplete</option>
            </select>
        </div>

        <div>
            {
                todo.length === 0 ? (
                    <>
                    <div className='border-2 border-[#FF7D29] w-full h-[500px] mt-10'>
                        <p className='text-center mt-10 text-2xl text-[#B4B4B8]'>You have no task</p>
                    </div>
                    </>
                ) : (
                    <>
                    <div>
                        {
                            
                        }
                    </div>
                    </>
                )
            }
        </div>
    </div>
  )
}

export default TodoList