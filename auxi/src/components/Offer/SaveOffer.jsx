import { TextField,Box } from "@mui/material";
import React,{ useEffect, useState }  from "react";
import { useJwt } from "react-jwt";
import { Calendar } from 'primereact/calendar';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { outlinedInputClasses } from '@mui/material/OutlinedInput';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import '../../styles/Offer.css'

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
        <Box sx={{ bgcolor: 'rgba(255, 255, 255, 0.2)', height: '170%', width: '100%'}} >
        <h2 className="title">Crea tu Oferta</h2>
          <ThemeProvider theme={theme}>
            <TextField
            id="standard-multiline-flexible"
            className="name"
            label="Nombre de la oferta"
            multiline
            variant="standard"
            maxRows={4}
            onChange={handleChange}
            />

            <TextField
            id="standard-multiline-static"
            className="description"
            label="Descripción"
            multiline
            rows={4}
            variant="standard"
            onChange={handleChange}
            />
            </ThemeProvider>
                {/* <label htmlFor="time24">Time / 24h</label> */}
            <Calendar id="time24" className="calendar" value={start} onChange={(e) => setStart(e.value)} showTime showSeconds />
            <Calendar id="time24" className="calendar" value={start} onChange={(e) => setStart(e.value)} showTime showSeconds />

            <Button id="save" variant="contained">Guardar</Button>
        </Box>
        </Container>
          
        </div>
      </form>
    );
}

export default SaveOffer