import React, { useEffect, useState } from "react";
import { ExperienceService } from "../../services/ExperienceService";
import { useJwt } from "react-jwt";
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { TextField,Box, Select, MenuItem } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { outlinedInputClasses } from '@mui/material/OutlinedInput';
import '../../styles/Profile.css'

const token = sessionStorage.getItem('token');

function Profile(){

  const theme = createTheme({
    components: {
      MuiSelect: {
        styleOverrides: {
          root: {
            color: 'white',
            '&:before': {
              borderColor: 'white !important'
            },
            '&:after':{
              borderColor: 'white !important'
            },
            '& .MuiSvgIcon-root':{
              color: 'white'
            }  
          }
        }
      },
      MuiInputBase: {
        styleOverrides: {
          input: {
            "&::placeholder": {
              color: "white",
            },
            "&: focus": {
              color: "white",
            },
            "&:focus:not(.Mui-disabled, .Mui-error):before": {
              color: "white",
            },
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            "--TextField-brandBorderColor": "#e6f1f7",
            "--TextField-brandBorderHoverColor": "#e6f1f7",
            "--TextField-brandBorderFocusedColor": "#e6f1f7",
            "& label.Mui-focused": {
              color: "var(--TextField-brandBorderFocusedColor)",
            },
            "&::placeholder": {
              color: "white",
            },
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          notchedOutline: {
            borderColor: "var(--TextField-brandBorderColor)",
          },
          backgroundColor: "white",
          root: {
            [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: "var(--TextField-brandBorderHoverColor)",
            },
            [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: "var(--TextField-brandBorderFocusedColor)",
            },
          },
        },
      },
      MuiInput: {
        styleOverrides: {
          root: {
            "&::before": {
              borderBottom: "2px solid var(--TextField-brandBorderColor)",
            },
            "&:hover:not(.Mui-disabled, .Mui-error):before": {
              borderBottom: "2px solid var(--TextField-brandBorderHoverColor)",
            },
            "&.Mui-focused:after": {
              borderBottom:
                "2px solid var(--TextField-brandBorderFocusedColor)",
            },
          },
          input: {
            "&::placeholder": {
              color: "white",
            },
            color: "white",
          },
        },
      },
      MuiDesktopDatePicker: {
        styleOverrides: {
          root: {
            "& input": {
              color: "white",
            },
            "& fieldset": {
              borderColor: "white",
            },
            "&:hover fieldset": {
              borderColor: "white",
            },
            "&.Mui-focused fieldset": {
              borderColor: "white",
            },
          },
        },
      },
    },
  });

    const { decodeToken, isExpired } = useJwt(token);
    console.log(decodeToken)

    const [values, setValues] = React.useState({
      textmask: '(100) 000-0000',
      numberformat: '1320',
    });
    const [profile,setProfile] =useState({
        number:'',
        name:'',
        phone:'',
        study_type:'',
        schedule:'',
        zone:'',
        experiences:[''],
        studies:['']
    })

    const [experiences,setExperiences]=useState([])
    const [studies,setStudies]=useState([])

    const experienceService = new ExperienceService()

    useEffect(()=>{
        ( ()=>  LoadExperiences())()
    },[])

    async function LoadExperiences(){
        if(decodeToken != null){
            const response = experienceService.listFilter(decodeToken.sub)
            setExperiences(response.data)
            console.log(response.data)
        }
    }


    const handleChange = (e) => {
        const { name, value } = e.target;
    
        setProfile((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
    
      const handleExperienciaChange = (e) => {
        const { name, value } = e.target;
    
        setProfile((prevData) => ({
          ...prevData,
          experiences: {
            ...prevData.experiences,
            [name]: value,
          },
        }));
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
    
        // Validar y procesar los datos antes de agregarlos a la tabla
        if (profile.number && profile.name && profile.phone) {
          setExperiences((prevData) => [...prevData, profile]);
          // También puedes enviar los datos al servidor aquí
        }
      };


    return (
      <form onSubmit={handleSubmit}>
        <div className="profile-container">
          <h2 className="profile">Perfil</h2>
          <CssBaseline />
          {/* <Container className="containerProfile" maxWidth="sm"> */}
          <Box
            className="box-profile"
            height={300}
            width={1200}

            sx={{ bgcolor: "rgba(255, 255, 255, 0.2)", overflowX:'hidden', overflowY:'hidden'}}
          >
            <ThemeProvider theme={theme}>
              <div id="nameLabelProfile">
                <label>Nombre</label>
              </div>
              <TextField
                id="standard-multiline-flexible"
                className="nameProfile"
                name="name"
                label=""
                multiline
                variant="outlined"
                maxRows={4}
                onChange={handleChange}
              />
              <div id="phoneLabelProfile">
                <label>Numero</label>
              </div>
              <TextField
                id="standard-multiline-flexible"
                className="numberProfile"
                label=""
                multiline
                variant="outlined"
                inputProps={{ type: "number" }}
                onChange={handleChange}
              />
              <div id="studyTypeLabel">
                <label>Profesion</label>
              </div>
              <Select
                defaultValue="Auxiliar de Enfermeria"
                id="named-select"
                className="studyTypeSelect"
              >
                <MenuItem value="ten">Auxiliar de Enfermeria</MenuItem>
                <MenuItem value="ten2">Enfermeria</MenuItem>
              </Select>
              <div id="workingHourLabel">
                <label>Horario Laboral</label>
              </div>
              <Select
                defaultValue="Lunes"
                id="name-select"
                className="workingHourSelect"
              >
                <MenuItem value="Lun">Lunes</MenuItem>
                <MenuItem value="Mar">Martes</MenuItem>
                <MenuItem value="Mie">Miercoles</MenuItem>
                <MenuItem value="Jue">Jueves</MenuItem>
                <MenuItem value="Vie">Viernes</MenuItem>
                <MenuItem value="Sab">Sabado</MenuItem>
                <MenuItem value="Dom">Domingo</MenuItem>
              </Select>
              <div id="separatorLabel">
                <h2>-</h2>
              </div>
              <Select
                defaultValue="Lunes"
                id="name-select"
                className="workingHourSelectTwo"
              >
                <MenuItem value="Lun">Lunes</MenuItem>
                <MenuItem value="Mar">Martes</MenuItem>
                <MenuItem value="Mie">Miercoles</MenuItem>
                <MenuItem value="Jue">Jueves</MenuItem>
                <MenuItem value="Vie">Viernes</MenuItem>
                <MenuItem value="Sab">Sabado</MenuItem>
                <MenuItem value="Dom">Domingo</MenuItem>
              </Select>
              <div id="zoneLabel">
                <label>Zona de Trabajo</label>
              </div>
              <Select
                defaultValue="Lunes"
                id="name-select"
                className="zoneProfile"
              >
                <MenuItem value="OCC">Occidente</MenuItem>
                <MenuItem value="ORI">Oriente</MenuItem>
                <MenuItem value="NOR">Norte</MenuItem>
                <MenuItem value="SUR">Sur</MenuItem>
                <MenuItem value="SUROR">SurOriente</MenuItem>
                <MenuItem value="SUROC">SurOccidente</MenuItem>
                <MenuItem value="NOROC">NorOccidente</MenuItem>
                <MenuItem value="NOROR">NorOriente</MenuItem>
                <MenuItem value="NODEF">No Definido</MenuItem>
              </Select>
            </ThemeProvider>
          </Box>
          {/* </Container> */}
        </div>
      </form>
    );
}


export default Profile