import { Button, Card, CardContent, Grid, Paper, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { handleId, handleTextId, HANDLE_ID, HANDLE_Text_ID } from '../Redux/Actoin';
import { motion } from "framer-motion"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Enter_Car = () => {
  const carSlots = useSelector((state: any) => state.carSlots);
  const ids = useSelector((state: any) => state.id);
  const [text, setText] = useState<any>();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e: any) => {
    setText(e.target.value)
  }

  const handleCarSlots = () => {
    if (!text) {
      toast.dark("please enter anything")
    } else {

      let temp = [...carSlots]

      let emptyslots = temp.filter((item: any) => item.EnterCarNo === '')
      if (emptyslots.length === 0) {
        toast('Slot is not empty')
      } else {

        //random_slot
        const id = emptyslots[Math.floor(Math.random() * emptyslots.length)].id
        console.log('iddddd', id);

        const indexno = temp.findIndex((i) => i.id === id)
        console.log('szdfg', indexno);

        const current = new Date();
        const time = `${current.getHours()}:${current.getMinutes()}`;
        temp[indexno].available = false;
        temp[indexno].EnterCarNo = text;
        temp[indexno].carParkingTime = time;  //new Date().setHours(new Date().getHours() - 3);

        dispatch(handleId(HANDLE_ID, temp))
        console.log('length', temp);

        setText('')
      }
    }
  }

  const handleExit = (id: any) => {
    dispatch(handleTextId(HANDLE_Text_ID, id))
    console.log("exitItem", id);

    navigate('/exitCar')
  }

  return (
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      exit={{ x: window.innerWidth }}
    >
      <Grid >
        <Grid style={{ display: 'flex', justifyContent: "center", marginTop: 50 }}>
          <Button color='warning' onClick={() => { navigate('/') }}><ArrowBackIcon /></Button>
          <TextField data-testid="Car_Input_Check" onChange={handleChange} value={text} name='text' placeholder='Enter Car no' style={{ width: 350 }} />
          <Button data-testid="CarNo_Button_Check" onClick={handleCarSlots}>Add Car</Button>
        </Grid>

        <Box style={{ gap: "15px", height: 80, }}>
          {
            carSlots?.map((item: any, i: any) => {
              return (
                <Grid container justifyContent='center'>
                  <Grid item xs={6} >
                    <Card onClick={() => !item.EnterCarNo ? toast.warning('This CarSlot is empty') : handleExit(item)} key={i} style={{ margin: '20px', cursor: "pointer", background: !item.EnterCarNo ? '' : '#FFEDDB' }}>
                      <CardContent>
                        <Typography color="textSecondary" gutterBottom>
                          id: <Box display='inline'  > {item.id} </Box>
                        </Typography>
                        <Typography variant="h6" component="h2">
                          CarNo:   <Box display='inline' fontWeight='900'  >{item.EnterCarNo}</Box>
                        </Typography>
                        {!item.EnterCarNo ?
                          null : <Typography marginTop="5px" >
                            Time:  <Box display='inline' fontWeight='900'  >{item.carParkingTime}</Box>
                          </Typography>}
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              )
            })
          }
        </Box>
      </Grid>
      <ToastContainer position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick
        rtl={false} />
    </motion.div>
  )
}

export default Enter_Car
