
import React, { useState,useEffect } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios from "axios"
import "../style.css"




interface Statu {
    id: number
    title: string
    categoryId: number
    color: string
    createdAt: string
    updatedAt: string
}
function StatuModal({setCategoryOrStatu, selectCategoryId}:any) {
    const [statuList, setStatuList] = useState<Statu[]>([])
    const [userToken, setUserToken] = useState<string>()

    // add statu
    const onSubmit = (e: any) => {
        e.preventDefault()
        
        const statuInput = e.target.elements.addStatuInput.value;
        const color = e.target.elements.addColor.value;

        const data = JSON.stringify({ 
            title: statuInput,
            categoryId:selectCategoryId, 
            color:color
         });

         const headers = {
            Authorization: `Bearer ${userToken}`,
            'Content-Type': 'application/json',
        }
        if (statuInput != "") {
            console.log(statuInput)
            axios.post("http://localhost:80/status", data, { headers })
                .then((response) => {
                    console.log(response.data)
                    
                })
                .catch((err) => {
                    console.log("hata", err)
                })
        }
    }

    //get status
    useEffect(()=>{
        // console.log("kategori id",selectCategoryId )
        const cookieValue = `; ${document.cookie}`
        const token = cookieValue.split(`; token=`)
        // console.log("user token", token[1])
        setUserToken(token[1])

        const headers = {
            Authorization: `Bearer ${token[1]}`
        }
        axios.get(`http://localhost:80/status?categoryId=${selectCategoryId}`, { headers })
            .then((response) => {
                console.log(response.data)
                setStatuList(response.data)
            })
            .catch((err) => {
                console.log("hata", err)
            })
    },[])


    return (
        <form onSubmit={onSubmit}>
            <Button style={{marginBottom: 10}} variant="contained" size='small' onClick={()=>setCategoryOrStatu(false)}>Back</Button>
            <div className='modalAddCategory'>
                <TextField
                    id="addStatuInput"
                    label="Add Statu"
                // defaultValue="E-mail"
                />
                <TextField
                    id="addColor"
                    label="Add Color"
                    style={{marginLeft: 10}}
                />
                <Button style={{marginLeft: 10}} type='submit' variant="contained">Add Statu</Button>
            </div>

            <div>
                {
                    statuList.map((item) => {
                        return (
                            <div key={item.id} className='modalStatuDiv'>
                                <span>{item.title}</span>
                                <div>
                                    <Button style={{marginRight: 10}} variant="contained" size='small'>Delete</Button>
                                    <Button variant="contained" size='small'>Edit</Button>
                                </div>

                            </div>
                        )
                    })
                }
            </div>
        </form>
    )
}

export default StatuModal