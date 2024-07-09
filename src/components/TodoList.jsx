import React, { useEffect, useState } from 'react';
import { TiPencil } from 'react-icons/ti';
import { BsTrash } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, removeTodo, setTodo, sortTodo, toggleCompleted, updateTodo } from '../features/todoSlice';

const TodoList = () => {
    const todo = useSelector((state) => state.todos.todo);
    const sort = useSelector((state) => state.todos.sort);
    const dispatch = useDispatch();

    const [showModal, setShowModal] = useState(false);
    const [currTodo, setCurrTodo] = useState(null);
    const [newTask, setNewTask] = useState('');
    console.log(newTask);

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

    const handleRemove = (id) => {
        dispatch(removeTodo({
            id: id
        }));
        localStorage.setItem("todo", JSON.stringify(id));
    }

    const handleUpdate = (id, task) => {
        if(task.trim().length === 0){
            alert("Please enter a task");
        } else {
            dispatch(updateTodo({
                task: task,
                id: id,
            }));
            setShowModal(false);
        }
    }

    const handleSort = (sort) => {
        dispatch(sortTodo(sort));
    }

    useEffect(() => {
        if(todo.length > 0){
            localStorage.setItem('todo', JSON.stringify(todo));
        }
    }, [todo]);

    useEffect(() => {
        const localTodo = JSON.parse(localStorage.getItem('todo'));
        if(localTodo){
            dispatch(setTodo(localTodo));
        }
    }, [dispatch]);

    const sortTodoList = todo.filter((todo) => {
        if (sort === "All") return true;
        if (sort === "Completed" && todo.completed) return true;
        if (sort === "Incomplete" && !todo.completed) return true;
        return false;
    });

    const handleToggle = (id) => {
        dispatch(toggleCompleted({id: id}))
    }

    return (
        <div className='w-[40%]'>
            <div>
                {showModal && (
                    <div className='fixed w-full top-0 left-0 h-full bg-[rgba(0,0,0,.5)] flex items-center justify-center'>
                        <div className='bg-white w-[20%] p-6 rounded-md gap-y-4 flex flex-col'>
                            <input
                                type="text"
                                placeholder={currTodo ? "Update Your Task" : "Enter Your Task"}
                                value={newTask}
                                onChange={(e) => setNewTask(e.target.value)}
                                className='outline-none border-b-2 font-normal rounded-sm px-1 w-full py-[8px] border-[#C7C8CC]'
                            />
                            <div>
                                {currTodo ? (
                                    <div className='flex justify-between'>
                                        <button onClick={() => setShowModal(false)} className='bg-[#2F3645] text-[14px] font-medium px-6 py-[8px] hover:shadow-none rounded-sm text-white shadow-md'>Cancel</button>
                                        <button onClick={() => { setShowModal(false); handleUpdate(currTodo.id, newTask) }} className='bg-[#FF7D29] text-[14px] font-medium px-6 py-[8px] hover:shadow-none rounded-sm text-white shadow-md'>Update</button>
                                    </div>
                                ) : (
                                    <div className='flex justify-between'>
                                        <button onClick={() => setShowModal(false)} className='bg-[#2F3645] text-[14px] font-medium px-6 py-[8px] hover:shadow-none rounded-sm text-white shadow-md'>Cancel</button>
                                        <button onClick={() => handleAddTask(newTask)} className='bg-[#FF7D29] text-[14px] font-medium px-6 py-[8px] hover:shadow-none rounded-sm text-white shadow-md'>Add Task</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className='flex w-full justify-between items-center'>
                <button
                    onClick={() => setShowModal(true)}

                    className='bg-[#FF7D29] text-xl font-semibold px-6 py-[5px] rounded-sm text-white shadow-lg'
                >
                    Add Task
                </button>
                <select
                    defaultValue="All"
                    onChange={(e) => handleSort(e.target.value)}
                    className='text-xl font-semibold px-4 py-[5px] rounded-sm text-white shadow-lg outline-none bg-[#2F3645]'
                >
                    <option value="All">All</option>
                    <option value="Completed">Completed</option>
                    <option value="Incomplete">Incomplete</option>
                </select>
            </div>

            <div>
                {todo.length === 0 ? (
                    <div className='w-full h-[500px] mt-10'>
                        <p className='text-center mt-10 text-2xl text-[#B4B4B8]'>You have no task</p>
                    </div>
                ) : (
                    <div className='w-full h-[500px] mt-10'>
                        {sortTodoList.map((item) => (
                            <div key={item.id} className='flex items-center justify-between mb-4 bg-gray-100 mx-auto w-full p-4 rounded-sm'>
                                <div className={`cursor-pointer ${item.completed ? "line-through text-green-400" : "text-red-400"}`}
                                onClick={() => handleToggle(item.id)}>{item.task}</div>
                                <div>
                                    <button onClick={() => { setShowModal(true); setCurrTodo(item); setNewTask(item.task); }} className='bg-blue-500 text-white p-1 hover:bg-blue-600 rounded-sm ml-2'><TiPencil /></button>
                                    <button onClick={() => handleRemove(item.id)} className='bg-[#FF7D29] text-white p-1 hover:bg-[#EB5B00] rounded-sm ml-2'><BsTrash /></button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default TodoList;
