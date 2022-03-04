import React from 'react'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import "./style.css"

function AddTodo() {
    const [category, setCategory] = React.useState<string>('');
    const [status, setStatus] = React.useState<string>('');

    const handleChangeCategory = (event: SelectChangeEvent) => {
        setCategory(event.target.value);
    };
    const handleChangeStatus = (event: SelectChangeEvent) => {
        setStatus(event.target.value);
    };

    return (
        <div className='addTodo'>
            <TextField className='addTodo-textField' label="Add Todo" variant="outlined" />

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
            <Button variant="contained" >Add Todo</Button>
        </div>
    )
}

export default AddTodo