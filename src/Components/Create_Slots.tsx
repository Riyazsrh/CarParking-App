import React, { useState } from 'react'
import { Button, Grid, } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useDispatch, useSelector } from 'react-redux'
import { handleId, HANDLE_ID } from '../Redux/Actoin';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import { motion } from "framer-motion"
import 'react-toastify/dist/ReactToastify.css';


const Create_Slots = () => {

  const [text, setText] = useState<any>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e: any) => {
    setText(e.target.value)
  }
  let temarr: any = [];

  const handleSlost = () => {
    for (let i = 1; i <= text; i++) {

      let newObject = {
        id: i,
        EnterCarNo: '',
        available: true,
        time: new Date(),
      }
      temarr.push(newObject)
    }
    dispatch(handleId(HANDLE_ID, temarr))
    console.log("All items", temarr);
    navigate('/enterCar')
    // setText('')
  }

  return (
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      exit={{ x: window.innerWidth }}
      
    >
      <Grid mb={10} style={{ textAlign: "center", marginTop: 100,}}>
        <TextField data-testid="Slot_Input_Check" placeholder='Create Slots' type='number' value={text} onChange={handleChange} style={{ width: 350, }} />
        <Button data-testid="Slot_Button_Check" onClick={handleSlost} variant='outlined' disabled={!text} style={{ height: 55, }}>Create Slots</Button>
      </Grid>
    </motion.div>
  )
}

export default Create_Slots
