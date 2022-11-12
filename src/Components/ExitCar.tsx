import { Box, Button, Divider, Grid, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../App.css';
import axios from 'axios'
import { motion } from "framer-motion"


const ExitCar = () => {

    const [res, setRes] = useState<any>()
    const carSlots = useSelector((state: any) => state?.carSlots);
    const ids: any = useSelector((state: any) => state.id);
    const navigate = useNavigate();


    const PaymentHandler = (EnterCarNo: any,) => {
        let regCarId = {
            carNo: EnterCarNo
        };
        console.log('car_payment_obj', regCarId);

        axios.post("https://httpstat.us/200", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(regCarId),
        })
            .then((res) => {
                res.status === 200
                    ? toast("Payment Successful")
                    : toast("Payment Unsuccefull");
                setRes(res.data)
            })
    }


    //deallocation
    const handledelocate = () => {
        let index: any = carSlots.findIndex((item: any) => item.id === ids?.id);
        if (index !== '') {
            carSlots[index].EnterCarNo = "";
            carSlots[index].available = true;
            carSlots[index].carParkingTime = "";
        }
        navigate("/enterCar");
    }

    //Payment_
    let removespacedetail: any = carSlots?.find(
        (item: any) => item.id === ids?.id
    );

    //timing
    let entryMinutes = removespacedetail?.time?.getMinutes();
    let currTime = new Date();

    let endTimeHours = currTime?.getHours();
    let endTimeMin = currTime?.getMinutes();


    
    let totalDuration = Math.floor(endTimeMin - entryMinutes);
    let totalHours = Math.round(totalDuration / 60);
    let totalMinutes = totalDuration % 60;
    console.log('timm', totalMinutes);

    let totalCharge = 0;

    if (totalHours <= 2) {
        totalCharge = 10;
    } else if (totalMinutes > 0) {
        totalCharge = totalHours * 10 + 2;
    } else {
        totalCharge = (totalHours - 1) * 10;
    }

    return (
        <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            exit={{ x: window.innerWidth }}
        >
            <Typography variant='h4' style={{ color: "blue", textAlign: "center" }}>Payment Details</Typography>
            <Grid item xs={12} textAlign="justify" style={{
                justifyContent: 'center',
                display: 'flex'
            }} >
                <Grid mt={5}>
                    <Typography color="red" gutterBottom>
                        id:  <Box display='inline' className='ExitPage' ml={17}> {ids?.id}  </Box>
                    </Typography><Divider />
                    <Typography color="red" mt={3}>
                        CarNo:  <Box display='inline' className='ExitPage' ml={13}> {ids?.EnterCarNo} </Box>
                    </Typography><Divider />
                    <Typography color="red" mt={3}>
                        Total Duration: <Box display='inline' className='ExitPage' ml={6}>0{totalHours} : {totalDuration}  </Box>
                    </Typography><Divider />
                    <Typography color="red" mt={3}>
                        Amount To be Paid:  <Box display='inline' className='ExitPage' ml={3}> {totalCharge}$  </Box>
                    </Typography><Divider />
                    <Grid item xs={12} >
                        <Box mt={4}>
                            {!res && <Button data-testid="payment_btn" onClick={() => PaymentHandler(removespacedetail?.EnterCarNo)} variant='outlined' color="primary" >Payment</Button>}
                            {res && <Button onClick={handledelocate} variant='outlined' style={{ color: 'red' }}>Deallocate Space</Button>}
                            <Button data-testid="back_btn" variant='outlined' color='warning' onClick={() => { navigate('/enterCar') }} style={{ marginLeft: '27px' }}>Back</Button>
                        </Box>
                    </Grid>
                </Grid>
                <ToastContainer position="top-center"
                    autoClose={3000}
                    hideProgressBar={false}
                    closeOnClick
                    rtl={false}
                    theme='dark' />
            </Grid>
        </motion.div>
    )
}

export default ExitCar
