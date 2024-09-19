import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const UserForm = () => {

  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [users, setUsers] = useState([]);


  const onSubmit = (data) => {
    setUsers([...users, data]);
    reset();
  };


  const deleteUser = (index) => {
    const newUsers = users.filter((_, i) => i !== index);
    setUsers(newUsers);
  };


  const clearTable = () => {
    setUsers([]);
  };

  return (
    <div>
      <h2>Добавить пользователя</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Name</label>
          <input
            {...register("name", { required: "Это поле обязательно" })}
            type="text"
          />
          {errors.name && <p>{errors.name.message}</p>}
        </div>
        <div>
          <label>Username</label>
          <input
            {...register("username", { required: "Это поле обязательно" })}
            type="text"
          />
          {errors.username && <p>{errors.username.message}</p>}
        </div>
        <div>
          <label>Email</label>
          <input
            {...register("email", {
              required: "Это поле обязательно",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Введите корректный email"
              }
            })}
            type="email"
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div>
          <label>Phone</label>
          <input
            {...register("phone", { required: "Это поле обязательно" })}
            type="tel"
          />
          {errors.phone && <p>{errors.phone.message}</p>}
        </div>
        <div>
          <label>Website</label>
          <input
            {...register("website")}
            type="url"
          />
        </div>

        <button type="submit">Создать</button>
        <button type="button" onClick={clearTable}>Очистить таблицу</button>
      </form>

      <h2>Список пользователей</h2>
      {users.length === 0 ? (
        <p>Таблица пуста</p>
      ) : (
        <table border="1">
          <thead>
            <tr>
              <th>Name</th>
              <th>Username</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Website</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.website}</td>
                <td>
                  <button onClick={() => deleteUser(index)}>Удалить</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserForm;
