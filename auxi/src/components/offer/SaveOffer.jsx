import { TextField,Box } from "@mui/material";
import React,{ useEffect, useState, useRef }  from "react";
import { useJwt } from "react-jwt";
import { Calendar } from 'primereact/calendar';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { outlinedInputClasses } from '@mui/material/OutlinedInput';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import '../../styles/Offer.css'
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { TimeField } from '@mui/x-date-pickers/TimeField';

const token = sessionStorage.getItem('token')

function SaveOffer(){

    var time = new Date()

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
    
    const[offer,setOffer] = useState({
        id:'',
        name: '',
        description:'',
        state:'',
        date: new Date(),
        timeBegin: '',
        timeFinal: ''
    })

    const handleChange = (e) =>{
        const { name, value } = e.target;
        setOffer((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    return (
      <form>
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
            multiline
            rows={4}
            variant="outlined"
            onChange={handleChange}
            />

            {/* <label htmlFor="time24">Time / 24h</label> */}
            {/* <Calendar id="time24" className="calendar" value={start} onChange={(e) => setStart(e.value)} showTime showSeconds />
            <Calendar id="time24" className="calendar" value={start} onChange={(e) => setStart(e.value)} showTime showSeconds /> */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div id="dateLabel">
              <label>Fecha disponibilidad del servicio</label>
            </div>
            <DesktopDatePicker className="calendar" format="DD-MM-YYYY" defaultValue={dayjs('2022-04-17')} onChange={handleChange}/>
            <div id="timeStartLabel">
              <label>Hora de Inicio</label>
            </div>
            <TimeField  className="timeStart" defaultValue={dayjs('2022-04-17T15:30')} onChange={handleChange}/>
            <div id="timeFinalLabel">
              <label>Hora de Fin</label>
            </div>
            <TimeField  className="timeFinal" defaultValue={dayjs('2022-04-17T15:30')} onChange={handleChange}/>
            {/* <MobileDateTimePicker className="calendar" defaultValue={dayjs('2022-04-17T15:30')} />
            <MobileDateTimePicker className="calendarDos" defaultValue={dayjs('2022-04-17T15:30')} /> */}
            
            </LocalizationProvider>
            </ThemeProvider>

            <Button id="save" variant="contained">Guardar</Button>
        </Box>
        </Container>
          
        </div>
      </form>
    );
}

export default SaveOffer