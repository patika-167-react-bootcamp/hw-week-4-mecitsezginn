import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Button from '@mui/material/Button';

import AddTodo from "./AddTodo";
import ModalPage from "./ModalPage/ModalPage";
import "./style.css"
import axios from "axios"

interface Category {
  id: number
  title: string
  userId: number
  createdAt: string
  updatedAt: string
}
interface Statu {
  id: number
  title: string
  categoryId: number
  color: string
  createdAt: string
  updatedAt: string
}
interface Todo {
  id: number
  title: string
  userId: number
  categoryId: number
  statusId: number
  createdAt: string
  updatedAt: string
}

interface TodoFamily {
  id: number
  todoName: string
  statuName: string
  categoryName: string
}

function TodoList() {
  const [todoL, setTodoL] = useState<Todo[]>([])
  const [todoFamilyList, setTodoFamilyList] = useState<TodoFamily[]>([])

  const [categoryList, setCategoryList] = useState<Category[]>([])
  const [statuList, setStatuList] = useState<Statu[]>([])

  const [category, setCategory] = React.useState<string>('');
  const [status, setStatus] = React.useState<string>('');

  const handleChangeCategory = (event: SelectChangeEvent) => {
    setCategory(event.target.value);
  };
  const handleChangeStatus = (event: SelectChangeEvent) => {
    setStatus(event.target.value);
  };

  const getStatu = (todolist: any, token: string) => {
    const headers = {
      Authorization: `Bearer ${token}`
    }

    todolist.map((todoItem: any) => {
      axios.get(`http://localhost:80/status?categoryId=${todoItem.categoryId}`, { headers })
        .then((response) => {
          let statuName = response.data[todoItem.statusId - 1]

          axios.get(`http://localhost:80/category/${todoItem.categoryId}`, { headers })
            .then((response) => {
              let categoryName = response.data.title

              setTodoFamilyList((state) =>[...state, {
                id: todoItem.id,
                todoName: todoItem.title,
                statuName: statuName.title,
                categoryName: categoryName
              }])
            })
        })
        .catch((err) => console.log("getStatu hata", err))
    })
  }


  //get todo, get category, get statu
  useEffect(() => {
    const cookieValue = `; ${document.cookie}`
    const token = cookieValue.split(`; token=`)
    // console.log("user token", token[1])

    const headers = {
      Authorization: `Bearer ${token[1]}`
    }
    axios.get("http://localhost:80/todo", { headers })
      .then((response) => {
        console.log("todo list", response.data)
        setTodoL(response.data)
        getStatu(response.data, token[1])
      })
      .catch((err) => {
        console.log("categoryList hata", err)
      })
  }, [])


  return (
    <div className='todo'>
      <div className='filter'>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="inputCategory">Category</InputLabel>
          <Select
            labelId="selectCategoryLabel"
            id="selectCategory"
            value={category}
            label="Category"
            onChange={handleChangeCategory}
            className='input-label'
          >
            <MenuItem value={"10"}>Ten</MenuItem>
            <MenuItem value={"20"}>Twenty</MenuItem>
            <MenuItem value={"30"}>Thirty</MenuItem>
          </Select>

        </FormControl>

        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="inputStatus">Status</InputLabel>
          <Select
            labelId="selectStatusLabel"
            id="selectStatus"
            value={status}
            label="Status"
            onChange={handleChangeStatus}
            className='input-label'
          >
            <MenuItem value={"10"}>Ten</MenuItem>
            <MenuItem value={"20"}>Twenty</MenuItem>
            <MenuItem value={"30"}>Thirty</MenuItem>
          </Select>
        </FormControl>

        <Button style={{ marginRight: 20 }} variant="contained" >filter</Button>
        <Button variant="contained" >clear filter</Button>
      </div>

      <AddTodo />

      <div>
        {
          todoFamilyList.map((item) => {
            return (
              <div key={item.id}>
                <span>Todo= {item.id} {item.todoName}   Statu: {item.statuName}   Category: {item.categoryName} </span>
              </div>
            )
          })
        }
      </div>
 
      <ModalPage />

    </div>
  )
}

export default TodoList