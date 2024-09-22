import {useForm} from "react-hook-form";
import axios from "axios";
import './App.css';
import {useEffect, useState} from "react";


function App() {
    const [message, setMessage] = useState()
    const [isOpen, setIsOpen] = useState(false)
    const {handleSubmit, register, formState: {errors}} = useForm()
    const [users, setUsers] = useState([])
    useEffect(() => {
        fetchUsers()
        console.log(users)
    }, [])



    const openModal = () => {
        setIsOpen(true)
    }
    const closeModal = () => {
        setIsOpen(false)
    }
    const deleteUser = async(id) => {
        const response = await axios.delete(`http://localhost:8000/posts/${id}`)
        setMessage("пользователь успешно удален")
        openModal()
        fetchUsers()
    }
    const fetchUsers = async() => {
        const response = await axios.get("http://localhost:8000/posts")
        setUsers(response.data)
    }

    const onSubmit = async(data) => {
        const response = await axios.post("http://localhost:8000/posts", data)
        setMessage("пользователь успешно создан")
        openModal()
        fetchUsers()

    }

  return (
    <div className="App">
        <form onSubmit={handleSubmit(onSubmit)}>
            <input type="text" placeholder="name" {...register("name", {required: true})}/>
            {errors.name
            && <div>это обязательное поле</div>}
            <input type="text" placeholder="email" {...register("email", {required: true})}
            />
            {errors.email
            && <div>это обязательное поле</div>}
            <input type="text" placeholder="username" {...register("username", {required: true})}/>
            {errors.username
            && <div>это обязательное поле</div>}
            <button type={"submit"}>create</button>
        </form>
        {users.length === 0 ? (
        <p>Список пуст</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Username</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td className="td">{user.name}</td>
                <td className="td">{user.email}</td>
                <td className="td">{user.username}</td>
                <td>
                    <button onClick={() => deleteUser(user.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
        {isOpen && (
            <div className="modal">
                <div className="bg-m">
                    <h3>{message}</h3>
                    <button onClick={closeModal}>закрыть</button>
                </div>
            </div>

        )}
    </div>
  );
}

export default App;
