import React, { useState } from 'react'
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import "../style.css"
import CategoryModal from "./CategoryModal"
import StatuModal from "./StatuModal"

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function ModalPage() {

    const [categoryOrStatu, setCategoryOrStatu] = useState<boolean>(false)
    const [selectCategoryId, setSelectCategoryId] = useState<number>()
    const [open, setOpen] = useState<boolean>(false);
    const handleOpen = () => {
        setOpen(state => !state);
    }

    return (
        <div>
            <Button onClick={handleOpen} variant="contained" >Kategori ekle</Button>
            <Modal
                open={open}
                onClose={handleOpen}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {categoryOrStatu === false 
                    ? <CategoryModal 
                            setCategoryOrStatu={(event:any) =>setCategoryOrStatu(event)}
                            setSelectCategoryId={(event:any) =>setSelectCategoryId(event)}
                      /> 
                    : <StatuModal 
                        setCategoryOrStatu={(event:any) =>setCategoryOrStatu(event)} 
                        selectCategoryId = {selectCategoryId}
                    />}
                </Box>


            </Modal>
        </div>
    )
}

export default ModalPage