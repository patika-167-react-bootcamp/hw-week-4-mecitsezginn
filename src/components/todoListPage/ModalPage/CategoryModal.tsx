import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import "../style.css"
import axios from "axios"

interface Category {
    id: number
    title: string
    userId: number
    createdAt: string
    updatedAt: string
}

function CategoryModal({ setCategoryOrStatu, setSelectCategoryId }: any) {
    const [categoryList, setCategoryList] = useState<Category[]>([])
    const [userToken, setUserToken] = useState<string>()


    //add category
    const onSubmit = (e: any) => {
        e.preventDefault()

        const headers = {
            Authorization: `Bearer ${userToken}`,
            'Content-Type': 'application/json',
        }

        const categoryInput = e.target.elements.addCategoryInput.value;
        const data = JSON.stringify({ title: categoryInput });

        if (categoryInput != "") {
            console.log(categoryInput)
            axios.post("http://localhost:80/category", data, { headers })
                .then((response) => {
                    console.log(response.data)
                    setCategoryList(response.data)
                })
                .catch((err) => {
                    console.log("hata", err)
                })
        }

    }

    // get category list
    useEffect(() => {
        const cookieValue = `; ${document.cookie}`
        const token = cookieValue.split(`; token=`)
        // console.log("user token", token[1])
        setUserToken(token[1])

        const headers = {
            Authorization: `Bearer ${token[1]}`
        }
        axios.get("http://localhost:80/category", { headers })
            .then((response) => {
                // console.log(response.data)
                setCategoryList(response.data)
            })
            .catch((err) => {
                console.log("hata", err)
            })

    }, [])

    return (
        <form onSubmit={onSubmit}>

            {/* CATEGORY MODAL */}
            <div className='modalAddCategory'>
                <TextField id="addCategoryInput" label="Add Category" />
                <Button type='submit' variant="contained">Add Category</Button>
            </div>

            <div>
                {
                    categoryList.map((item) => {
                        return (
                            <div key={item.id} className='modalStatuDiv'>
                                <span>{item.title}</span>
                                <Button 
                                    variant="contained" size='small' 
                                    onClick={() => {
                                        setCategoryOrStatu(true)
                                        setSelectCategoryId(item.id)
                                    }}
                                >Edit</Button>
                            </div>
                        )
                    })
                }

            </div>
        </form>
    )
}

export default CategoryModal