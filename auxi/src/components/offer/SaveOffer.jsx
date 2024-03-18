import { TextField,Box } from "@mui/material";
import React,{ useEffect, useState, useRef }  from "react";
import { useJwt } from "react-jwt";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { outlinedInputClasses } from '@mui/material/OutlinedInput';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import '../../styles/Offer.css'
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import { LocalizationProvider } from "@mui/x-date-pickers";
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { TimeField } from '@mui/x-date-pickers/TimeField';
import { OfferService } from "../../services/OfferService";
import { off } from "process";




const token = sessionStorage.getItem('token')
const email = sessionStorage.getItem('email')


function SaveOffer(){

    const theme = createTheme({
        components:{
          MuiInputBase:{
            styleOverrides: {
                input:{

                     '&::placeholder':{
                        color: 'white'
                     },
                    '&: focus':{
                        color: 'white'
                    },
                    '&:focus:not(.Mui-disabled, .Mui-error):before': {
                        color:'white'
                    }
                }
            }
          },
          MuiTextField:{
            styleOverrides:{
                root:{
                    '--TextField-brandBorderColor': '#e6f1f7',
                    '--TextField-brandBorderHoverColor': '#e6f1f7',
                    '--TextField-brandBorderFocusedColor': '#e6f1f7',
                    '& label.Mui-focused': {
                        color: 'var(--TextField-brandBorderFocusedColor)',
                    },
                    '&::placeholder':{
                        color: 'white'
                     },
                }
            }
          },
          MuiOutlinedInput: {
            styleOverrides: {
              notchedOutline: {
                borderColor: 'var(--TextField-brandBorderColor)',
              },
              backgroundColor: 'white',
              root: {
                [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
                  borderColor: 'var(--TextField-brandBorderHoverColor)',
                },
                [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
                  borderColor: 'var(--TextField-brandBorderFocusedColor)',
                },
              },
            },
          },
          MuiInput: {
            styleOverrides: {
              root: {
                '&::before': {
                  borderBottom: '2px solid var(--TextField-brandBorderColor)',
                },
                '&:hover:not(.Mui-disabled, .Mui-error):before': {
                  borderBottom: '2px solid var(--TextField-brandBorderHoverColor)',
                },
                '&.Mui-focused:after': {
                  borderBottom: '2px solid var(--TextField-brandBorderFocusedColor)',
                },
              },
              input:{
                '&::placeholder':{
                    color: 'white'
                 },
                 color: 'white'
              }
            },
          },
          MuiDesktopDatePicker:{
            styleOverrides:{
              root:{
                '& input':{
                  color: 'white'
                },
                '& fieldset':{
                  borderColor: 'white'
                },
                '&:hover fieldset':{
                  borderColor:'white'
                },
                '&.Mui-focused fieldset':{
                  borderColor: 'white'
                }
              }
            }
          }
        }
      })

    const{ decodeToken, isExpired} = useJwt('token')
    console.log(decodeToken)
    const [start, setStart] = useState(new Date())
    const offerService =  new OfferService();
    const utc = require('dayjs/plugin/utc')
    dayjs.extend(utc)

    const[offer,setOffer] = useState({
        name: '',
        description:'',
        state:'nuevo',
        date: React.useState(dayjs('2022-04-17')),
        start_time: React.useState(dayjs('2022-04-17T15:30')),
        final_time: React.useState(dayjs('2022-04-17T15:30')),
        email: JSON.parse(email)
    })


    //console.log(dayjs.utc().local().format()  )

    const handleChange = (e) =>{
        const { name, value } = e.target;
        console.log(name)
        console.log(value)
        setOffer((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const originalTimezone = offer.start_time;
    //console.log(originalTimezone)

    const handleStartTimeChange = (time) =>{
      const newTimeString = time.toISOString()
      console.log(newTimeString)
      //const timeOnly = newTimeString.substring(11,19)
      //console.log(timeOnly)
      const utcTime = dayjs.utc(newTimeString).local().format('HH:mm:ss');
      console.log(utcTime)
      setOffer(prevOffer => ({
        ...prevOffer,
        start_time:utcTime
      }))
      console.log('oferta '+offer.start_time)
    }

    const handleFinalTimeChange = (time) =>{
      const newTimeString = time.toISOString()
      console.log(newTimeString)
      //const timeOnly = newTimeString.substring(11,19)
      //console.log(timeOnly)
      const utcTimeFinal = dayjs.utc(newTimeString).local().format('HH:mm:ss');
      setOffer(prevOffer => ({
        ...prevOffer,
        final_time:utcTimeFinal
      }))
      console.log(offer.final_time)
    }

    const handleDateChange = (newDateTime) =>{
      const newDateString = newDateTime.toISOString()
      console.log(newDateString)
      const dateOnly = newDateString.substring(0, 10);
      console.log(dateOnly)

      setOffer(prevOffer => ({
        ...prevOffer,
        date:dateOnly
      }))
      console.log(offer.date)
    }
   
    const handleSubmit = async(event)=>{
      event.preventDefault();
      const response = await offerService.saveOffer(JSON.stringify(offer))
      console.log(response)
    }

    return (
      <form onSubmit={handleSubmit}>
        <div className="offer-container">

            <CssBaseline />
        <Container maxWidth="sm">
        <Box sx={{ bgcolor: 'rgba(255, 255, 255, 0.2)', height: '125%', width: '100%'}} >
        <h2 className="title">Crea tu Oferta</h2>
          <ThemeProvider theme={theme}>
            <div id="nameLabel">
              <label>Nombre de la Oferta</label>
            </div>
            <TextField
            id="standard-multiline-flexible"
            className="name"
            name="name"
            label=""
            multiline
            variant="outlined"
            maxRows={4}
            onChange={handleChange}
            />

            <div id="descriptionLabel">
              <label>Descripción</label>
            </div>
            <TextField
            id="standard-multiline-static"
            className="description"
            label=""
            name="description"
            multiline
            rows={4}
            variant="outlined"
            onChange={handleChange}
            />

            <LocalizationProvider dateAdapter={AdapterDayjs} >
            <div id="dateLabel">
              <label>Fecha disponibilidad del servicio</label>
            </div>
            <DesktopDatePicker className="calendar" format="DD-MM-YYYY" defaultValue={dayjs('2022-04-17')} onChange={handleDateChange}/>
            <div id="timeStartLabel">
              <label>Hora de Inicio</label>
            </div>
            <TimeField  className="timeStart" format="h:mm A" defaultValue={dayjs('2022-04-17T15:30')} onChange={handleStartTimeChange}/>
            <div id="timeFinalLabel">
              <label>Hora de Fin</label>
            </div>
            <TimeField  className="timeFinal" defaultValue={dayjs('2022-04-17T15:30')} onChange={handleFinalTimeChange}/>
           
            </LocalizationProvider>
            </ThemeProvider>

            <Button id="save" type="submit" variant="contained">Guardar</Button>
        </Box>
        </Container>
          
        </div>
      </form>
    );
}

export default SaveOffer