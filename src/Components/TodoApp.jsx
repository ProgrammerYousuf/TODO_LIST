import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import "../App.css";
import { FaTasks } from "react-icons/fa";
import { TfiSave } from "react-icons/tfi";


const TodoApp = () => {
    const [todo, setTodo] = useState("")
    const [todos, setTodos] = useState([])
    const [showFinished, setshowFinished] = useState(true)

    useEffect(() => {
        let todoString = localStorage.getItem("todos")
        if (todoString) {
            let todos = JSON.parse(localStorage.getItem("todos"))
            setTodos(todos)
        }
    }, [])


    const saveToLS = (params) => {
        localStorage.setItem("todos", JSON.stringify(todos))
    }

    const toggleFinished = (e) => {
        setshowFinished(!showFinished)
    }




    const handleEdit = (e, id) => {
        let t = todos.filter(i => i.id === id)
        setTodo(t[0].todo)
        let newTodos = todos.filter(item => {
            return item.id !== id
        });
        setTodos(newTodos)
        saveToLS()
    }

    const handleDelete = (e, id) => {
        let newTodos = todos.filter(item => {
            return item.id !== id
        });
        setTodos(newTodos)
        saveToLS()
    }

    const handleAdd = () => {
        setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
        setTodo("")
        saveToLS()
    }

    const handleChange = (e) => {
        setTodo(e.target.value)
    }

    const handleCheckbox = (e) => {
        let id = e.target.name;
        let index = todos.findIndex(item => {
            return item.id === id;
        })
        let newTodos = [...todos];
        newTodos[index].isCompleted = !newTodos[index].isCompleted;
        setTodos(newTodos)
        saveToLS()
    }

    return (
        <div>
            <div className="md:container mx-3 md:mx-auto bg-violet-100 rounded-xl my-5 p-5 min-h-[80vh] md:w-1/2 min-w-1/2   ">
                <h1 className="font-bold text-[3vw] md:text-[2vw] flex justify-center items-center">iTodo-list - Manage your todos at one place <FaTasks className="flex justify-center mx-1 mt-1 items-center" /></h1>
                <div className="addTodo my-5 flex flex-col gap-4">
                    <h1 className="text-lg font-bold">Add a Todo</h1>
                    <input
                        onChange={handleChange}
                        value={todo}
                        type="text"
                        className="w-full outline-none px-5 py-1 rounded-md bg-white"
                    />
                    <button
                        onClick={handleAdd}
                        disabled={todo.length <= 3}
                        className="bg-violet-800 flex items-center justify-center gap-1 disabled:bg-violet-900 hover:bg-violet-950 p-2  py-1 text-white rounded-md  text-sm font-bold capitalize"
                    >
                        save <TfiSave />
                    </button>
                </div>
                <input
                    type="checkbox"
                    onChange={toggleFinished}
                    checked={showFinished}
                    className="my-4"
                />{" "}
                Show Finished
                <h2 className="text-lg font-bold">Your Todos</h2>
                <div className="todos">
                    {todos.length === 0 && (
                        <div className="m-2 capitalize">No Todos to display </div>
                    )}
                    {todos.map((item) => {
                        return (
                            (showFinished || !item.isCompleted) && (
                                <div
                                    key={item.id}
                                    className="todo my-3 flex justify-between min-w-full"
                                >
                                    <div className="flex gap-5">
                                        <input
                                            type="checkbox"
                                            onChange={handleCheckbox}
                                            checked={item.isCompleted}
                                            name={item.id}
                                        />
                                        <div className={item.isCompleted ? "line-through" : ""}>
                                            {item.todo}
                                        </div>
                                    </div>
                                    <div className="button flex h-full">
                                        <button
                                            onClick={(e) => handleEdit(e, item.id)}
                                            className="bg-violet-800 hover:bg-violet-950 p-2  py-1 text-white rounded-md  text-sm font-bold capitalize mx-1"
                                        >
                                            <FaEdit />
                                        </button>
                                        <button
                                            onClick={(e) => handleDelete(e, item.id)}
                                            className="bg-violet-800 hover:bg-violet-950 p-2  py-1 text-white rounded-md  text-sm font-bold capitalize mx-1"
                                        >
                                            <AiFillDelete />
                                        </button>
                                    </div>
                                </div>
                            )
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default TodoApp;

